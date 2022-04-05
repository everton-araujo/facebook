import Image from "next/image";

export function StoryCard({ name, src, profile }) {
  return (
    <div className="relative h-14 w-14 md:h-20
    md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3">
      <Image
        src={profile}
        width={40}
        height={40}
        layout='fixed'
        objectFit="cover"
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10 hover:opacity-50"
      />

      <Image
        src={src}
        layout='fill'
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl hover:opacity-50"
      />
    </div>
  )
}
