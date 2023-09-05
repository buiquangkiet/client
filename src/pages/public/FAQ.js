import React, { useState } from "react";
import faq1 from "assets/faq/faq1.jpg";
import faq2 from "assets/faq/faq2.jpg";
import faq3 from "assets/faq/faq3.jpg";
import faq4 from "assets/faq/faq4.jpg";
import faq5 from "assets/faq/faq5.jpg";
import faq6 from "assets/faq/faq6.jpg";
import faq7 from "assets/faq/faq7.jpg";
import { useSelector } from "react-redux";

const FAQ = () => {
    const { width } = useSelector(state => state.app)
    const [activeQuestion, setActiveQuestion] = useState(0);
    const img = [faq1, faq2, faq3, faq4, faq5, faq6, faq7];
    const question = [
        "Order Scenarios",
        "Delivery & Shipping",
        "Account Scenarios",
        "Payment & Billing",
        "Loyalty Programs, Coupons & Discounts",
        "Subscriptions Related",
        "Other General FAQs",
    ];
    const answer = [
        "Where is my order?",
        "Can I adjust my order?",
        "What if my order arrives damaged?",
        "I want to cancel my order",
        "How long does it take to get my refund?",
        "Where do you ship?",
        "What’s my delivery status?",
        "How long does it take for my order to be delivered?",
        "Do you offer fast shipping? (G)",
        "Will I pay taxes for international shipping?",
        "How can I stop *`Company Name`* e-mails from going into my spam folder?",
        "What if I have forgotten my password?",
        "Can I edit my personal details?",
        "I want to opt out of the e-mail list, how can I do so?",
        "I haven’t received/can’t find my order confirmation email – how do I check my order has been accepted?",
        "Payment failed or pending",
        "What payment methods do you accept?",
        "Why is my card being declined?",
        "Are payment and shopping on your site safe & secure?",
        "Do you accept bitcoin or any form of digital currency?",
        "What is a coupon? I have received a promotion coupon code how do I use it?",
        "Where can I find currently running offers/ promotions?",
        "Do you offer a referral program? How does it work? (G)",
        "How do I join loyalty program?",
        "What do I get for joining loyalty program?",
        "How do I subscribe?",
        "How do I upgrade, downgrade, or cancel a subscription?",
        "Should I choose monthly or yearly plan?",
        "How is my subscription charged?",
        "What currency will I be billed in?",
        "What can I return?",
        "How to return items?",
        "What are the return guidelines?",
        "Do I need to pay shipping charges for any items returned to you by courier?",
        "Will I pay taxes for international shipping? (G)",
    ];
    const faq = [];
    for (let i = 0; i < question.length; i++) {
        const questionObj = {
            question: question[i],
            answers: answer.slice(i * 5, i * 5 + 5),
            img: img[i],
        };

        faq.push(questionObj);
    }
    return (
        <div className="w-main mt-5 mb-[100px] flex flex-col  gap-5">
            <span className="text-[20px] font-semibold">FAQ</span>
            <div className={`w-full flex border p-3 ${width === 1 && "flex-col"}`}>
                <div className={`flex flex-col gap-3 ${width === 1 ? "w-full order-2" : " w-[50%]"}`}>
                    {faq.map((item, index) => (
                        <div
                            key={item.question}
                            className="py-3 border-b-[1px]"
                        >
                            <div
                                className="flex justify-between  cursor-pointer"
                                onClick={() => setActiveQuestion(index)}
                            >
                                <span className="font-semibold text-[18px]">
                                    {item.question}
                                </span>
                                <span className="w-[20px] h-[20px] flex items-center justify-center border rounded-full">
                                    {index === activeQuestion ? "-" : "+"}
                                </span>
                            </div>
                            {index === activeQuestion && <div className="animate-showMenu2">
                                <ul className="ml-5 text-gray-500">
                                    {activeQuestion === index &&
                                        item.answers.map((answer) => (
                                            <li key={answer} className="list-disc ">
                                                {answer}
                                            </li>
                                        ))}
                                </ul></div>}
                        </div>
                    ))}
                </div>
                <div className={`${width === 1 ? "w-full order-1" : "w-[50%]"}`}>
                    <img src={img[activeQuestion]} alt="" className="animate-showText" />
                </div>
            </div>
        </div>
    );
};

export default FAQ;
