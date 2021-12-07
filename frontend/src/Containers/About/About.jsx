import React from "react";
import MetaData from "../../HOCS/MetaData";

const About = () => {
	return (
		<>
			<MetaData title="Moto App | About" />
			<div className="container about">
				<div className="about__about">
					<h1 className="heading about__heading">About Us</h1>
					<div className="about__content">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi veniam reprehenderit quibusdam earum velit cupiditate magni sit in quasi quia nostrum deserunt illo porro maiores, excepturi praesentium deleniti ducimus nisi
							culpa corporis pariatur vero aut sapiente non? Itaque, fuga non id repellat alias quo libero voluptate sint soluta? Odit vitae ipsa nobis excepturi ratione nemo facere aut sapiente aperiam. Tempore sunt neque officiis
							labore dignissimos, optio impedit ea ullam suscipit molestiae! Cum asperiores aperiam, deleniti quia aspernatur animi eaque atque iusto nostrum. Nisi consequuntur dicta repudiandae eum quidem fugiat. Dolorum inventore
							explicabo expedita odit quo aliquid sunt cupiditate voluptatem omnis? Excepturi facere autem ad rerum provident ipsa, sunt eius sint libero deserunt perferendis esse minima quam nulla quisquam nesciunt voluptas.
						</p>
					</div>
				</div>
				<div className="about__faq">
					<h3 className="heading about__faq__heading py-4">Frequently Asked Questions</h3>
					<h4 className="sub-heading about__faq__subheading">Top Queries</h4>
					<div className="about__faq__content">
						<details className="about__faq__details">
							<summary>What is Try and Buy Service?</summary>
							<p>
								This service entitles you to try out your purchases at the time of delivery, pay only for what you like and return the rest on-the-spot. Try and Buy is a paid service, available on most of the products and in 31
								Cities, you can enter pin code on product page to check service availability. Try and Buy is only available on orders containing &lt;=3 items in cart. To avail this service min. order value should be Rs.1199 and above.
								To avail the service, please ensure that you tick the 'Try and Buy' box on check-out page and choose delivery address where you are comfortable trying product. Terms of service may differ for our new customers. Try and
								Buy will not be available during big sale days; We will re-offer the service, post such events.
							</p>
						</details>
						<details className="about__faq__details">
							<summary>Why are there different prices for the same product? Is it legal?</summary>
							<p>
								MotoShop is an online marketplace platform that enables independent sellers to sell their products to buyers. The prices are solely decided by the sellers, and MotoShop does not interfere in the same. There could be a
								possibility that the same product is sold by different sellers at different prices. MotoShop rightfully fulfils all legal compliances of onboarding multiple sellers on its forum as it is a marketplace platform.
							</p>
						</details>
						<details className="about__faq__details">
							<summary>How will I detect fraudulent emails/calls seeking sensitive personal and confidential information?</summary>
							<p>
								If you receive an e-mail, a call from a person/association claiming to be from MotoShop seeking sensitive confidential information like debit/credit card PIN, net-banking or mobile banking password, we request you to
								never provide such confidential and personal data. We at MotoShop or our affiliate logistics partner never ask for such confidential and personal data. If you have already revealed such information, report it
								immediately to an appropriate law enforcement agency. Here are a couple of baits fraudsters often use to cheat consumers: Congratulations! You have been nominated as a ‘Top MotoShop customer’ and are now eligible for a
								luxury gift item. Please share your proof of address and your debit/credit card details to avail this great offer. Hi, I’m calling from MotoShop. We are happy to let you know that you have won an exclusive lucky draw
								coupon of Rs. 5000 on your latest purchase. Please share your credit/debit card number so we can credit the money directly into your bank account.
							</p>
						</details>
						<details className="about__faq__details">
							<summary>How will I identify a genuine appointment letter?</summary>
							<p>
								Please beware of the fraudulent individuals/agencies that are enticing job seekers by promising them career opportunities at MotoShop in lieu of 1.) recruitment fee 2.) processing fee 3.) security deposit 4.) software
								or equipment charges 5.) on-boarding charges etc. Please be cautious that, MotoShop and its recruitment partners never ask for any fee in exchange for an offer letter or interview calls. All offer related
								communications are sent from an official MotoShop email id only.
							</p>
						</details>
						<details className="about__faq__details">
							<summary>Why will 'My Cashback' not be available on MotoShop?</summary>
							<p>
								To make your shopping experience easier and simpler, 'My Cashback' will be replaced by PhonePe. PhonePe wallet can be used on MotoShop and other PhonePe partners. To use your PhonePe balance, you will have to
								activate/verify your PhonePe account
							</p>
						</details>
						<details className="about__faq__details">
							<summary>How do I cancel the order, I have placed?</summary>
							<p>
								Order can be canceled till the same is out for delivery. Note: This may not be applicable for certain logistics partner. You would see an option to cancel within 'My Orders' section under the main menu of your
								App/Website/M-site then select the item or order you want to cancel. In case you are unable to cancel the order from'My Orders' section, you can refuse it at the time of delivery and refund will be processed into the
								source account, if order amount was paid online.
							</p>
						</details>
						<details className="about__faq__details">
							<summary>I have created a Return request. When will the product be picked up?</summary>
							<p>Number of days to pickup a product may vary as per the Logistics team that will be assigned to pickup your product. The product will be picked anywhere between 4 – 7 days.</p>
						</details>
					</div>
					<h4 className="sub-heading about__faq__subheading">Shipping and Delivery</h4>
					<div className="about__faq__content">
						<details className="about__faq__details">
							<summary>What is MotoShop’s Fair Usage Policy?</summary>
							<p>
								We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal returns policy. These accounts typically return most of the items bought or choose to
								not accept our shipments. Hence, our regular customers are deprived of the opportunity to buy these items. To protect the rights of our customers, we reserve the right to collect Convenience fee of INR 149 for all
								orders and disable cash on delivery option for accounts which have high percentage of returns and shipments not accepted by value of orders placed.
							</p>
						</details>
						<details className="about__faq__details">
							<summary>How do I check the status of my order?</summary>
							<p>Please tap on "Orders" section under main menu of App/Website/M-site to check your order status.</p>
						</details>
						<details className="about__faq__details">
							<summary>Does MotoShop deliver products outside Nepal?</summary>
							<p>No. At this point, MotoShop delivers products only within Nepal.</p>
						</details>
						<details className="about__faq__details">
							<summary>How can I get my order delivered faster?</summary>
							<p>Sorry, currently we do not have any service available to expedite the order delivery. In future, if we are offering such service and your area pincode is serviceable, you will receive a communication from our end.</p>
						</details>
					</div>
				</div>
			</div>
		</>
	);
};

export default About;
