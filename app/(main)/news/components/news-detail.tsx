import Image from "next/image";
import { Card } from "@/components/ui/card";

interface NewsDetailProps {
  news: {
    id: number;
    title: string;
    date: string;
    source: string;
    category: string;
    content: string;
    image: string;
  };
}

export default function NewsDetail({ news }: NewsDetailProps) {
  return (
    <article className="flex flex-col h-full">
      <Card className="sticky top-0 bg-background border-b border-border p-8 z-10 rounded-none">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">{news.category}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{news.date}</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">{news.title}</h1>
        <p className="text-sm text-muted-foreground font-medium">{news.source}</p>
      </Card>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Featured Image */}
          <Card className="mb-8 overflow-hidden bg-muted relative w-fit p-0">
            <Image src={news.image || "/placeholder.svg"} alt={news.title} width={800} height={600} />
          </Card>

          {/* Article Text */}
          <div className="prose prose-invert max-w-none">
            {/* <p className="text-lg text-foreground leading-relaxed mb-6">{news.content}</p> */}
            <div
              className="text-xs text-foreground leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
            {/* <p className="text-base text-muted-foreground leading-relaxed">
              This story continues to develop as more information becomes available. Stay tuned for updates on this
              evolving situation.
            </p> */}
          </div>
        </div>
      </div>
    </article>
  );
}
