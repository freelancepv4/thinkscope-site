"use client";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { Img } from "@/lib/data";

interface Props { id: string; tag: "Context" | "Interpretation"; heading: string; image?: Img; caption?: string; children?: ReactNode; more?: string }

export default function ArticleSection({ id, tag, heading, image, caption, children, more }: Props) {
  const dlg = useRef<HTMLDialogElement>(null);
  return (
    <section id={id} className="as" aria-labelledby={`${id}-h`}>
      <span className="tag">{tag}</span><h2 id={`${id}-h`}>{heading}</h2>
      {image && (
        <figure className="qf">
          <button type="button" className="zb" onClick={() => dlg.current?.showModal()} aria-label={`Enlarge image: ${caption ?? heading}`}>
            <Image src={image.src} width={image.w} height={image.h} alt={image.alt} sizes="(max-width: 800px) 100vw, 760px" />
          </button>
          {caption && <figcaption>{caption}</figcaption>}
          <dialog ref={dlg} className="lb" aria-label={heading} onClick={() => dlg.current?.close()}>
            <Image src={image.src} width={image.w} height={image.h} alt={image.alt} sizes="100vw" />
            <button type="button" className="lbx" onClick={() => dlg.current?.close()} aria-label="Close enlarged image">Close</button>
          </dialog>
        </figure>
      )}
      {children}
      {more && <details className="mo"><summary>Explore this idea</summary><p>{more}</p></details>}
    </section>
  );
}
