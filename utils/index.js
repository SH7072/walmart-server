const nodemailer = require('nodemailer');

const headers = `
<head>
	<style>
		// * {
		// 	box-sizing: border-box;
		// 	margin: 0px;
		// }

		// .container {
		// 	display: flex;
		// 	width: 70%;
		// 	/* justify-content: center; */
		// }

		// .card {
		// 	width: 100%;
			
		// 	border: 0.0625rem solid rgb(222, 226, 230);
		// 	border-radius: 10px;
		// 	display:flex;
		// 	 flex-direction:column;
		// 	 justify-content:center;
		// 	 align-items:center;
			
		// }

		// .middle {
		// 	// flex-grow: 3;
		// 	display: flex;
		// 	flex-direction:column;
		// 	margin-top: 1rem;
		// 	font-size: 25px;
		// }

		// .end {
		// 	margin-top: 1.2rem;
		// 	flex-grow: 1;
		// 	width:70%;
		// 	display:flex;

		// 	justify-content: space-between;
		// }

		// .price {
		// 	font-size: 18px;
		// 	font-weight: 1rem;
			
		// }

		// .quant {
		// 	font-size: 18px;
		// 	font-style: italic;
		// }
		
		// a {
		// 	text-decoration: none;
		// 	color: black;
		// }
		// .img {
			
		// 	width:60%;
			
			

			
		// }
	</style>
</head>
`;

const listItem = (img, name, price, quantity, link) => `
			<li style="width:inherit ;margin: 0px;padding-inline-start: 0px; margin-top:1rem; " >
			<a href=${link} 
			style=
			"text-decoration: none;
			color: black;">
				<div class="card" 
				style=
					"width: 100%;
					border: 0.0625rem solid rgb(222, 226, 230);
					border-radius: 10px;
					display:flex;
					flex-direction:'column';
					justify-content:center;
					align-items:center;" 
				>
					<img class="img"
					style="width:60%;"
						src="${img}"
						alt="">
					<div class="middle"
					style=
					"display: 'flex';
					flex-direction:'column';
					margin-top:1rem;
					font-size: 25px;"
					>
						
						<div class="title">${name}</div>
					</div>
					<div class="end"
					style=
					"margin-top: 1.2rem;
					flex-grow: 1;
					width:70%;
					display:'flex';
					justify-content: 'space-between';"
					>
						
						<div class="price"
						style=
						"font-size: 18px;
						font-weight: 1rem;"
						><p>Price: <span style="color:gray; ">${price}</span></p></div>
						
						<div class="quant" 
						style=
						"text-decoration: none;
						color:black;">
						<p>Quantity: <span style="color:gray; ">${quantity}</span></p></div>
					</div>
				</div>
				</a>
			</li>`

function getHtml(data) {
	let items = '';
	data.forEach(item => {
		items += listItem(item._doc.img, item._doc.name, item._doc.price, item.quantity, item._doc.link);
		// console.log(items);
	});
	// console.log(items);
	return `<html>${headers}<body 
					style=
					"box-sizing: 'border-box';
					margin: 0px;"
				><div class="container" 
				style=
				"display: 'flex';
				width: 70%;"
	><ul style="list-style-type:none">${items}</ul></div></body></html>`;;
}

exports.sendMail = async (mail, cartItems) => {
	// console.log(cartItems, "CartItems");
	const mailServer = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com',                  // hostname
		service: 'outlook',                             // service name
		secureConnection: false,
		tls: {
			ciphers: 'SSLv3'                            // tls version
		},
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASSWORD,
		},
	});
	const mailOptions = {
		from: process.env.MAIL_ID,
		to: mail,
		subject: "You Order has been placed",
		html: getHtml(cartItems)
	}
	mailServer.sendMail(mailOptions, (err, info) => {
		// console.log(mailOptions.html);
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
}

