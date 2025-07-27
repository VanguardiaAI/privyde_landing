import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
  Share2Icon,
  Link2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface SharePostProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
}

export const SharePost = ({
  title,
  url,
  description,
  className = "",
}: SharePostProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : "";

  const shareLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon size={18} data-oid="t0t9vad" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#4267B2] hover:bg-[#3b5998]",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon size={18} data-oid="6:kt.y." />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1DA1F2] hover:bg-[#1a91da]",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon size={18} data-oid="ejo_k_6" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0A66C2] hover:bg-[#0a5cb3]",
    },
    {
      name: "Email",
      icon: <MailIcon size={18} data-oid="roxjxcp" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "El enlace se ha copiado al portapapeles",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`} data-oid="jdcw5pr">
      <div className="flex items-center gap-2" data-oid="0:wm02o">
        <Share2Icon size={20} className="text-gray-500" data-oid="n.wn50." />
        <h3 className="font-medium" data-oid=".2pgrdn">
          Compartir este artículo
        </h3>
      </div>

      <div className="flex flex-wrap gap-2" data-oid="dl22m4x">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="default"
            size="sm"
            className={`${link.color} text-white rounded-full`}
            onClick={() => window.open(link.url, "_blank")}
            aria-label={`Compartir en ${link.name}`}
            data-oid="6qz7n-a"
          >
            {link.icon}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={copyToClipboard}
          aria-label="Copiar enlace"
          data-oid="0slmifa"
        >
          <Link2Icon size={18} data-oid="fd9ym85" />
        </Button>
      </div>
    </div>
  );
};
