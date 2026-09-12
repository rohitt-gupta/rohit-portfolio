"use client";

import NextImage, { type ImageProps } from "next/image";
import Link from "next/link";
import React from "react";

import HighlightBox from "@/components/highlight-box";
import StepCheck from "@/components/step-check";
import StepLarge from "@/components/step-large";
import StepLargeCustom from "@/components/step-large-custom";

import Button from "./button";
import Divider from "./divider";
import VideoComponent from "./video-component";
import VideoDemo from "./video-demo";

type MdxImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
};

/** Uses next/image when the MDX supplies explicit dimensions, a plain img otherwise. */
const MdxImage = ({ width, height, alt = "", src = "", ...props }: MdxImageProps) => {
  if (width && height) {
    return (
      <NextImage
        {...(props as Omit<ImageProps, "src" | "alt" | "width" | "height">)}
        src={src}
        width={Number(width)}
        height={Number(height)}
        alt={alt}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={src} loading="lazy" alt={alt} />;
};

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return <Link href={href} {...props}></Link>;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  Image: MdxImage,
  a: CustomLink,
  StepLarge,
  StepCheck,
  VideoDemo,
  HighlightBox,
  Divider,
  StepLargeCustom,
  VideoComponent,
  Button,
};

export default MDXComponents;
