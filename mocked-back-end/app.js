import express from "express";
import bodyParser from "body-parser";

const BRAND = process.env.BRAND || "default";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	bodyParser.text({
		type: "text/plain",
	})
);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, Authorization, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/me", (req, res) => {
	const me = require("./data/auth/me.json");
	res.status(200).json(me);
});

app.post("/me", (req, res) => {
	const me = require("./data/profile/saveProfile_SUCCESS.json");
	res.status(200).json(me);
});

app.post("/getBookings", (req, res) => {
	const me = require("./data/myBookings/myBookings.json");
	res.status(200).json(me);
});

app.post("/mybooking", (req, res) => {
	const me = require("./data/myBookings/myBooking.json");
	res.status(200).json(me);
});

app.post("/recoverMyBookingData", (req, res) => {
	res.status(200).end();
});

app.post("/addPayment", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));
	const bookingReference = body.bookingReference;

	if (bookingReference === "1000157") {
		const me = require("./data/myBookings/addPayment_CREDIT_CARD_REFUSED.json");
		res.status(402).json(me);
	} else {
		const me = require("./data/myBookings/addPayment.json");
		res.status(200).json(me);
	}
});

app.post("/oauth", (req, res) => {
	const oauth = require("./data/auth/oauth-SUCCESS.json");
	res.status(200).json(oauth);
});

app.post("/auth/local/login", (req, res) => {
	const body = JSON.parse(req.body);
	if (body.credentials.email === "emaildoesnotexist@perfectstay.com") {
		res.status(404).end();
	} else if (
		body.credentials.email === "passwordincorrect@perfectstay.com" ||
		body.credentials.password === "passwordincorrect"
	) {
		res.status(401).end();
	} else if (body.credentials.email === "emailfacebook@perfectstay.com") {
		res.status(403).end();
	} else if (body.credentials.email === "oldtoken@perfectstay.com") {
		let products = require("./data/auth/login-SUCCESS-oldToken.json");
		res.status(200).json(products);
	} else {
		let products = require("./data/auth/login-SUCCESS.json");

		if (body.credentials.email === "affr@perfectstay.com") {
			products = require("./data/auth/login-SUCCESS-AFFR.json");
		}

		if (body.credentials.email === "ssfr@perfectstay.com") {
			products = require("./data/auth/login-SUCCESS-SSFR.json");
		}

		if (body.credentials.email === "ekfr@perfectstay.com") {
			products = require("./data/auth/login-SUCCESS-EKFR.json");
		}

		if (body.credentials.email === "tofr@perfectstay.com") {
			products = require("./data/auth/login-SUCCESS-TOFR.json");
		}

		res.status(200).json(products);
	}
});

app.post("/auth/facebook", (req, res) => {
	const json = require("./data/auth/facebook-NO_EMAIL.json");
	res.status(403).json(json);
});

app.post("/auth/local/signup", (req, res) => {
	const body = JSON.parse(req.body);
	if (body.credentials.email === "emailexists@perfectstay.com") {
		res.status(403).end();
	} else {
		let signup = require("./data/auth/login-SUCCESS.json");

		if (body.credentials.email === "affr@perfectstay.com") {
			signup = require("./data/auth/signup-SUCCESS-AFFR.json");
		}

		if (body.credentials.email === "ssfr@perfectstay.com") {
			signup = require("./data/auth/signup-SUCCESS-SSFR.json");
		}

		if (body.credentials.email === "ekfr@perfectstay.com") {
			signup = require("./data/auth/signup-SUCCESS-EKFR.json");
		}

		if (body.credentials.email === "tofr@perfectstay.com") {
			signup = require("./data/auth/signup-SUCCESS-TOFR.json");
		}

		res.status(200).json(signup);
	}
});

app.post("/token/delete", (req, res) => {
	res.status(200).end();
});

app.post("/token/info", (req, res) => {
	const body = JSON.parse(req.body);
	if (!body.token) {
		res.status(400).json({
			message: ["instance is not of a type(s) object"],
			jsonschema: {
				schema: "http://json-schema.org/draft-04/schema#",
				title: "TokenInfoRequest",
			},
		});
	} else {
		const infos = require("./data/auth/tokenInfo.json");
		res.status(200).json(infos);
	}
});

app.post("/token/renew", (req, res) => {
	const body = JSON.parse(req.body);
	if (!body.token) {
		res.status(400).json({
			message: ["instance is not of a type(s) object"],
			jsonschema: {
				schema: "http://json-schema.org/draft-04/schema#",
				title: "TokenRenewRequest",
			},
		});
	} else {
		const token = require("./data/auth/tokenRenew.json");
		res.status(200).json(token);
	}
});

app.post("/token/delete", (req, res) => {
	const body = JSON.parse(req.body);
	if (!body.token) {
		res.status(400).json({
			message: ["instance is not of a type(s) object"],
			jsonschema: {
				schema: "http://json-schema.org/draft-04/schema#",
				title: "TokenRenewRequest",
			},
		});
	} else {
		const token = require("./data/auth/tokenDelete.json");
		res.status(200).json(token);
	}
});

app.get("/current/:shop/products-merchandising.json", (req, res) => {
	const today = new Date();

	let products = {};
	try {
		products = require(`./data/products-${BRAND}.json`);
	} catch (e) {
		products = require(`./data/products-default.json`);
	}

	// force les produits à expirer dans 3 jours et 23 heures
	products.products = products.products.map(product => {
		const endAt = new Date(today.getTime() + 3600000 * 32 * 3 + 3600 * 4);
		product.endAt = endAt.getTime();
		return product;
	});

	res.status(200).json(products);
});

app.get("/current/:shop/landing-pages.json", (req, res) => {
	const data = require(`./data/landing/landing-pages.json`);
	res.status(200).json(data);
});

app.get("/current/:shop/productTypes.json", (req, res) => {
	const data = require(`./data/landing/productTypes`);
	res.status(200).json(data);
});

app.get("/current/:shop/:productUri.json", (req, res) => {
	const productUri = req.params.productUri;
	const product = require(`./data/${productUri}.json`);

	// force le produits à expirer dans 3 jours et 23 heures
	const today = new Date();
	const endAt = new Date(today.getTime() + 3600000 * 32 * 3);
	product.endAt = endAt.getTime();

	res.status(200).json(product);
});

app.post("/quote", (req, res) => {
	// TODO Gérer le cas 400 dans le cas ou le partnercode est absent du payload
	const quote = require("./data/quote/quote-hotel-flight-SUCCESS.json");
	res.status(200).json(quote);
});

app.post("/flightOptions", (req, res) => {
	const quote = require("./data/quote/flight-options-NOT_INCLUDED_BOOKABLE.json");
	res.status(200).json(quote);
});

app.post("/preBook", (req, res) => {
	let preBook;
	try {
		preBook = require(`./data/preBook/preBook-SUCCESS-${BRAND}.json`);
	} catch (e) {
		preBook = require("./data/preBook/preBook-SUCCESS.json");
	}
	res.status(200).json(preBook);
});

app.post("/promoCode", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));
	let promoCode;
	if (body.promoCode) {
		promoCode = require("./data/promoCode/promoCode-SUCCESS.json");
	} else {
		promoCode = require("./data/promoCode/promoCode-REMOVED.json");
	}
	res.status(200).json(promoCode);
});

app.post("/book", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));
	let book;
	if (
		body.paymentType === "ideal" ||
		body.paymentType === "postfinance_efinance" ||
		body.paymentType === "postfinance_card"
	) {
		book = require("./data/paiement/book-4X-SUCCESS.json");
	} else {
		book = require("./data/paiement/book-SUCCESS.json");
	}
	res.status(200).json(book);
});

app.get("/paymentCallback", (req, res) => {
	const book = require("./data/paiement/paymentCallback.json");
	res.status(200).json(book);
});

app.post("/bookExternalPayment", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));
	let book;
	if (
		body.paymentType === "ideal" ||
		body.paymentType === "postfinance_efinance" ||
		body.paymentType === "postfinance_card"
	) {
		book = require("./data/paiement/book-4X-SUCCESS.json");
	} else {
		book = require("./data/paiement/bookExternalPayment_SUCCESS.json");
	}
	res.status(200).json(book);
});

app.post("/unsubscribe", (req, res) => {
	const unsubscribe = require("./data/unsubscribe/unsubscribe-SUCCESS.json");
	res.status(200).json(unsubscribe);
});

app.get("/sponsorship", (req, res) => {
	const json = require("./data/sponsorship/sponsorship_SUCCESS.json");
	res.status(200).json(json);
});

app.post("/inviteByEmail", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));
	let json;

	const hasAlreadyFriend = body.friends.includes("already-friend@gmail.com");

	if (hasAlreadyFriend) {
		json = require("./data/sponsorship/invite_ERROR.json");
		res.status(409).json(json);
	} else {
		json = require("./data/sponsorship/invite_SUCCESS.json");
		res.status(200).json(json);
	}
});

app.get("/getSponsorId", (req, res) => {
	const json = require("./data/sponsorship/getSponsorId_SUCCESS.json");
	res.status(200).json(json);
});

app.post("/subscribe", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));
	let json;

	const hasAlreadyFriend = body.sponsorId === "alreadyfriend";

	if (hasAlreadyFriend) {
		json = require("./data/sponsorship/subscribe_ERROR.json");
		res.status(409).json(json);
	} else {
		res.status(200).end();
	}
});

app.post("/credits", (req, res) => {
	const body = JSON.parse(JSON.stringify(req.body));

	if (!body.connectivitySessionCode) {
		res.status(400).end();
	} else {
		const json = require("./data/sponsorship/credits_SUCCESS.json");
		res.status(200).json(json);
	}
});

app.get("/resources/:lang/front-messages.json", (req, res) => {
	const lang = req.params.lang;
	const messages = require(`./data/resources/${lang}/front-messages.json`);
	res.status(200).json(messages);
});

app.get("/resources/:shop/pushNotifications.json", (req, res) => {
	const messages = require(`./data/resources/pushNotifications.json`);
	res.status(200).json(messages);
});

app.get("/auth/login", (req, res) => {
	const redirectUri = req.query.redirect_uri;
	setTimeout(() => {
		res.redirect(302, `${redirectUri}?code=sso-token&state=`);
	}, 3000);
});

app.use((err, req, res, next) => {
	console.log("Erreur : ", err);
	res.status(500).json(err);
});

export default app;
