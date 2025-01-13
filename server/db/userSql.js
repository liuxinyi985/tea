const user = {
    // 查询用户手机号
    queryUserPhone(phone) {
        console.log(phone, '查询用户手机号');
        
        return `select * from user where userTel=${phone}`;
        
    },
    // 查询密码
    queryUserPassword(phone, password) {
        return `select * from user where userTel=${phone} and userPwd=${password}`
    },
    	//新增用户
	inserData( option ){
        
		let userTel = option.userTel;
		let userPwd = option.userPwd;
         //引入token包
        let jwt = require('jsonwebtoken');
        //用户信息
        let payload = {tel:userTel};
        //口令
        let secret = 'my_token';
        //生成token
        let token = jwt.sign(payload,secret,{
            expiresIn:60
        });
     
        
		return 'insert into user (userTel,userPwd,imgUrl,nickName,token) values ("'+userTel+'","'+userPwd+'","/images/user.jpeg","'+userTel+'","'+token+'")';
	}
}

exports = module.exports = user;