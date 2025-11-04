import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = [
  { src: "/images/ComputerVision.png", alt: "ComVis" },
  { src: "/images/Iot.png", alt: "Iot" },
  { src: "/images/Webdev.png", alt: "Webdev" },
  { src: "/images/Netsec.png", alt: "NetSec" },
];

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-auto"
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card className="overflow-hidden bg-transparent">
                <CardContent className="relative aspect-square p-0">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority={index === 0}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
