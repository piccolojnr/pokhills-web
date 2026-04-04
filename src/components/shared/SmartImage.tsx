import { useEffect, useState } from "react";
import type { ImgHTMLAttributes, SyntheticEvent } from "react";

const NO_IMAGE_FALLBACK = "/images/no-image.svg";
const IMAGE_COMING_SOON_FALLBACK = "/images/image-coming-soon.svg";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallbackSrc?: string; // deprecated
  noImageFallbackSrc?: string;
  imageComingSoonFallbackSrc?: string;
}

export default function SmartImage({
  src = "",
  alt = "",
  noImageFallbackSrc = NO_IMAGE_FALLBACK,
  imageComingSoonFallbackSrc = IMAGE_COMING_SOON_FALLBACK,
  onError,
  ...rest
}: Props) {
  function resolveSource(value?: string) {
    const cleaned = value?.trim() ?? "";
    return cleaned ? cleaned : imageComingSoonFallbackSrc;
  }

  const [imgSrc, setImgSrc] = useState(() => resolveSource(src));

  useEffect(() => {
    setImgSrc(resolveSource(src));
  }, [src, imageComingSoonFallbackSrc]);

  function withBase(path: string) {
    if (
      /^(https?:)?\/\//.test(path) ||
      path.startsWith("data:") ||
      path.startsWith("blob:")
    ) {
      return path;
    }

    const base = import.meta.env.BASE_URL || "/";
    return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }

  function handleError(e: SyntheticEvent<HTMLImageElement, Event>) {
    const nextSrc = withBase(noImageFallbackSrc);

    if (e.currentTarget.src !== nextSrc) {
      setImgSrc(noImageFallbackSrc);
    }

    onError?.(e);
  }

  return (
    <img {...rest} src={withBase(imgSrc)} alt={alt} onError={handleError} />
  );
}
