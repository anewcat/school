const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/wangkachongzhi');
router.post('/', async (ctx, next) => {
	
});

router.post('/wang', async (ctx, next) => {
	// console.log("这里是wangkachongzhibbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    console.log(ctx.request.body);
		let id = ctx.request.body.uname;
        let pass=ctx.request.body.pass;
		// 根据楼管id修改数据
		let a = await query('SELECT * FROM wangkachongzhi where uname ='+ id +'&& pass = '+pass+'');
		// console.log(a,"这里是aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		// 格式化数据类型
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
		console.log(result);
		if (result.length > 0) {
			let data = {
				code: 200,
				data: result
			};
			ctx.body = data;
		} else {
			let data = {
				code: 0
			};
			ctx.body = data;
		}
});

router.post('/updatewang', async (ctx, next) => {
	// console.log("这里是wangkachongzhibbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",ctx.request.body);
    console.log(ctx.request.body);
		let money = ctx.request.body.money;
        // console.log(typeof(money))
        let id = ctx.request.body.uname;
        let pass=ctx.request.body.pass;
		let a = await query('SELECT * FROM wangkachongzhi where uname ='+ id +'&& pass = '+pass+'');
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
        console.log(result)
		let newmoney=parseInt(result[0].yuewang)+money;
        console.log(newmoney)
        let uname=result[0].uname;
		let nowtime=((new Date()).toLocaleDateString()).replace(/\//g,'-');
        let b = await query(`update wangkachongzhi set yuewang = '${newmoney}' ,timewang = '${nowtime}' ,lastwang = '${money}' where uname= '${uname}'`);
		let c = await query('SELECT * FROM wangkachongzhi where uname ='+ id +'&& pass = '+pass+'');
        var dataString1 = JSON.stringify(c);
		var result1 = JSON.parse(dataString1);
        if (result1.length > 0) {
			let data = {
				code: 200,
				data: result1
			};
			ctx.body = data;
		} else {
			let data = {
				code: 0
			};
			ctx.body = data;
		}
});

router.post('/ka', async (ctx, next) => {
	// console.log("这里是kakachongzhibbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    console.log(ctx.request.body);
		let id = ctx.request.body.uname;
        let pass=ctx.request.body.pass;
		// 根据楼管id修改数据
		let a = await query('SELECT * FROM wangkachongzhi where uname ='+ id +'&& pass = '+pass+'');
		// 格式化数据类型
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
		console.log(result);
		if (result.length > 0) {
			let data = {
				code: 200,
				data: result
			};
			ctx.body = data;
		} else {
			let data = {
				code: 0
			};
			ctx.body = data;
		}
});

router.post('/updateka', async (ctx, next) => {
    console.log(ctx.request.body);
		let money = ctx.request.body.money;
        // console.log(typeof(money))
        let id = ctx.request.body.uname;
        let pass=ctx.request.body.pass;
		let a = await query('SELECT * FROM wangkachongzhi where uname ='+ id +'&& pass = '+pass+'');
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
        console.log(result)
		let newmoney=parseInt(result[0].yueka)+parseInt(money);
        console.log(newmoney)
        let uname=result[0].uname;
		let nowtime=((new Date()).toLocaleDateString()).replace(/\//g,'-');
        let b = await query(`update wangkachongzhi set yueka = '${newmoney}' ,timeka = '${nowtime}' ,lastka = '${money}' where uname= '${uname}'`);
		let c = await query('SELECT * FROM wangkachongzhi where uname ='+ id +'&& pass = '+pass+'');
        var dataString1 = JSON.stringify(c);
		var result1 = JSON.parse(dataString1);
        if (result1.length > 0) {
			let data = {
				code: 200,
				data: result1
			};
			ctx.body = data;
		} else {
			let data = {
				code: 0
			};
			ctx.body = data;
		}
});


module.exports = router
