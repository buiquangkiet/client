import React, { useState } from "react";

const Comment = ({ item }) => {
    const [isShowMore, setIsShowMore] = useState(false);
    return (
        <span className="text-justify text-[14px]">
            <span>
                {!isShowMore
                    ? item?.comment.length > 100
                        ? item?.comment.slice(0, 50) + "..."
                        : item?.comment
                    : item?.comment}
            </span>
            {!isShowMore ? (
                item?.comment.length > 100 && (
                    <span
                        className=" font-medium cursor-pointer hover:underline"
                        onClick={() => setIsShowMore(true)}
                    >
                        Read More
                    </span>
                )
            ) : (
                <span
                    className=" font-medium cursor-pointer hover:underline ml-1"
                    onClick={() => setIsShowMore(false)}
                >
                    Show Less
                </span>
            )}
        </span>
    );
};

export default Comment;
