<template>
  <div class="goods-list">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm" class="form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类">
            <el-option label="红茶" value="red"></el-option>
            <el-option label="绿茶" value="green"></el-option>
            <el-option label="乌龙茶" value="oolong"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮 -->
    <div class="operation-bar">
      <el-button type="primary" @click="handleAdd">新增商品</el-button>
      <el-button type="danger" :disabled="!selectedItems.length" @click="handleBatchDelete">
        批量删除
      </el-button>
    </div>

    <!-- 商品表格 -->
    <el-table
      v-loading="loading"
      :data="goodsList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="商品ID" width="80"></el-table-column>
      <el-table-column label="商品图片" width="100">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.goods_imgUrl"
            :preview-src-list="[scope.row.goods_imgUrl]"
            fit="cover"
            style="width: 50px; height: 50px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" min-width="200"></el-table-column>
      <el-table-column prop="goods_price" label="价格" width="100">
        <template slot-scope="scope">
          ¥{{ scope.row.goods_price }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="100"></el-table-column>
      <el-table-column prop="stock" label="库存" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
            {{ scope.row.status === 1 ? '上架' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button 
            type="text" 
            @click="handleToggleStatus(scope.row)"
          >
            {{ scope.row.status === 1 ? '下架' : '上架' }}
          </el-button>
          <el-button type="text" class="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>

    <!-- 新增/编辑商品对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input-number 
            v-model="goodsForm.goods_price" 
            :precision="2" 
            :step="0.1" 
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="goodsForm.category" placeholder="请选择分类">
            <el-option label="红茶" value="red"></el-option>
            <el-option label="绿茶" value="green"></el-option>
            <el-option label="乌龙茶" value="oolong"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="goods_imgUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="true"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="goodsForm.goods_imgUrl" :src="goodsForm.goods_imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品库存" prop="stock">
          <el-input-number v-model="goodsForm.stock" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="goodsForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getGoodsList, createGoods, updateGoods, deleteGoods } from '@/api/goods'

export default {
  name: 'GoodsList',
  data() {
    return {
      loading: false,
      searchForm: {
        name: '',
        category: ''
      },
      goodsList: [
        {
            id: 1,
            goods_name: '毛尖',
            goods_price: 100,
            category: '红茶',
            goods_imgUrl: 'https://img.yzcdn.cn/vant/ipad.png',
            stock: 100,
            description: '毛尖',
            status: 1   
        },
        {
            id: 2,
            goods_name: '毛尖',
            goods_price: 100,
            category: '红茶',
            goods_imgUrl: 'https://img.yzcdn.cn/vant/ipad.png',
            stock: 100,
            description: '毛尖',
            status: 2
        },
        
      ],
      selectedItems: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      dialogVisible: false,
      dialogTitle: '',
      goodsForm: {
        goods_name: '',
        goods_price: 0,
        category: '',
        goods_imgUrl: '',
        stock: 0,
        description: '',
        status: 1
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        goods_imgUrl: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const res = await getGoodsList({
          page: this.page.current,
          size: this.page.size,
          ...this.searchForm
        })
        this.goodsList = res.data.items
        this.page.total = res.data.total
      } catch (error) {
        console.error(error)
        this.$message.error('获取商品列表失败')
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.page.current = 1
      this.fetchData()
    },
    resetSearch() {
      this.searchForm = {
        name: '',
        category: ''
      }
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    handleAdd() {
      this.dialogTitle = '新增商品'
      this.goodsForm = {
        goods_name: '',
        goods_price: 0,
        category: '',
        goods_imgUrl: '',
        stock: 0,
        description: '',
        status: 1
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑商品'
      this.goodsForm = { ...row }
      this.dialogVisible = true
    },
    async handleDelete(row) {
      try {
        await this.$confirm('确认删除该商品吗？', '提示', {
          type: 'warning'
        })
        await deleteGoods(row.id)
        this.$message.success('删除成功')
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
    async handleBatchDelete() {
      try {
        await this.$confirm(`确认删除选中的 ${this.selectedItems.length} 个商品吗？`, '提示', {
          type: 'warning'
        })
        // 实现批量删除逻辑
        this.$message.success('批量删除成功')
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
    async handleToggleStatus(row) {
      try {
        const newStatus = row.status === 1 ? 0 : 1
        await updateGoods({
          ...row,
          status: newStatus
        })
        this.$message.success(newStatus === 1 ? '商品已上架' : '商品已下架')
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
    beforeUpload(file) {
      console.log(file, 'file');
      
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    handleUploadSuccess(res) {
      console.log(res, 'res');
      this.goodsForm.goods_imgUrl = res.url
    },
    async submitForm() {
      try {
        await this.$refs.goodsForm.validate()
        if (this.goodsForm.id) {
          await updateGoods(this.goodsForm)
          this.$message.success('更新成功')
        } else {
          await createGoods(this.goodsForm)
          this.$message.success('创建成功')
        }
        this.dialogVisible = false
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  padding: 20px;

  .search-bar {
    margin-bottom: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
  }

  .operation-bar {
    margin-bottom: 20px;
  }

  .pagination-container {
    margin-top: 20px;
    text-align: right;
  }

  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      
      &:hover {
        border-color: #409EFF;
      }
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .danger {
    color: #F56C6C;
  }
}
</style>