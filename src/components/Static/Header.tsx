import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/writingIcon.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          Ai-Hoshino
        </h1>
      </Link>
        <Image
          alt="Vercel Icon"
          src="https://static.wikia.nocookie.net/logopedia/images/a/a7/Vercel_favicon.svg/revision/latest/scale-to-width-down/150?cb=20221026155821"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
    </header>
  );
}
