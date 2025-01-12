import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

export const BlurImage = ({
	src,
	className,
	...rest
}: {
	src: string;
	className: string;
}) => {
	const [isLoading, setLoading] = useState(true);
	return (
		<Image
			alt='blur image'
			className={clsx(
				"transition duration-500",
				isLoading ? "blur-sm scale-100" : " blur-0 scale-100",
				className
			)}
			onLoadingComplete={() => setLoading(false)}
			src={src}
			width={192}
			height={192}
			loading='lazy'
			decoding='async'
			blurDataURL={src}
			{...rest}
		/>
	);
};
