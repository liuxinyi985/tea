<template>
  <div class="goods-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        placeholder="请输入商品名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        添加商品
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="商品图片" width="110" align="center">
        <template slot-scope="{ row }">
          <el-image
            :src="row.goods_imgUrl"
            :preview-src-list="[row.goods_imgUrl]"
            fit="cover"
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>

      <el-table-column label="商品名称" min-width="200" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.goods_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="{ row }">
          <span>¥{{ row.goods_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    /> -->

    <!-- 添加/编辑商品对话框 -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="temp.goods_name" />
        </el-form-item>

        <el-form-item label="商品价格" prop="goods_price">
          <el-input-number
            v-model="temp.goods_price"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
          >
            <img
              v-if="temp.goods_imgUrl"
              :src="temp.goods_imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === '添加商品' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getGoodsList,
//   createGoods,
//   updateGoods,
//   deleteGoods,
// } from '@/api/goods';
// import Pagination from '@/components/Pagination';

export default {
  name: 'GoodsList',
  // components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        goods_name: '',
        goods_price: 0,
        goods_imgUrl: '',
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        this.listLoading = true;
        const { data } = await getGoodsList(this.listQuery);
        this.list = data.items;
        this.total = data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    resetTemp() {
      this.temp = {
        goods_name: '',
        goods_price: 0,
        goods_imgUrl: '',
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = '添加商品';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    async createData() {
      try {
        await this.$refs['dataForm'].validate();
        await createGoods(this.temp);
        this.dialogFormVisible = false;
        this.$message.success('创建成功');
        this.getList();
      } catch (error) {
        console.error(error);
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.dialogStatus = '编辑商品';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    async updateData() {
      try {
        await this.$refs['dataForm'].validate();
        await updateGoods(this.temp);
        this.dialogFormVisible = false;
        this.$message.success('更新成功');
        this.getList();
      } catch (error) {
        console.error(error);
      }
    },
    async handleDelete(row) {
      try {
        await this.$confirm('确认删除该商品吗？', '提示', {
          type: 'warning',
        });
        await deleteGoods(row.id);
        this.$message.success('删除成功');
        this.getList();
      } catch (error) {
        console.error(error);
      }
    },
    beforeImageUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handleImageSuccess(res, file) {
      this.temp.goods_imgUrl = res.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-container {
  padding: 20px;

  .filter-container {
    padding-bottom: 20px;
    .filter-item {
      margin-right: 10px;
    }
  }

  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
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
}
</style>
tea-admin-project/src/api/goods