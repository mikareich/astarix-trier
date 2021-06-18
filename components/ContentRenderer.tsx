import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import layoutStyles from "../styles/Layout.module.scss";

interface BlockRendererProps {
  content: Document;
}

const options: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <Link href={data.uri} passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">{children}</a>
      </Link>
    ),
    [BLOCKS.EMBEDDED_ASSET]: ({ data }) => {
      const { fields } = data.target;
      const isVideo = fields.file.contentType.includes("video");

      if (isVideo) {
        return (
          <video src={`https:${fields.file.url}`} controls>
            <track kind="captions" />
          </video>
        );
      }

      const isImage = fields.file.contentType.includes("image");
      if (isImage) {
        return (
          <div className={layoutStyles.imageContainer}>
            <Image
              src={`https:${fields.file.url}`}
              alt={fields.description}
              layout="fill"
            />
          </div>
        );
      }
      return null;
    },
    [BLOCKS.PARAGRAPH]: (_, children) => {
      const isHTML =
        children.toString().startsWith("<") &&
        children.toString().endsWith(">");
      if (isHTML)
        return (
          <div dangerouslySetInnerHTML={{ __html: children.toString() }} />
        );
      return <p>{children}</p>;
    },
  },
};

function ContentRenderer({ content }: BlockRendererProps) {
  return <>{documentToReactComponents(content, options)}</>;
}

export default ContentRenderer;
