import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

import DropDown, { VibeType } from "../components/Other/DropDown";
import Footer from "../components/Static/Footer";
import Github from "../components/Other/Github";
import Header from "../components/Static/Header";
import LoadingDots from "../components/Other/LoadingStuff";

interface BioApiResponse {
  text: string;
}

type ExtendedVibeType = VibeType | "Funny"; // Update the VibeType type

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<ExtendedVibeType>("Professional"); // Updated type
  const [generatedBios, setGeneratedBios] = useState<string>("");

  const bioRef = useRef<HTMLDivElement | null>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 2 ${vibe} DscInflux with no hashtags and clearly labeled "1." and "2.". ${
    vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : ""
  } Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        return;
      }

      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating bios.");
    } finally {
      scrollToBios();
      setLoading(false);
    }
  };

  const onParse = (event: ParsedEvent | ReconnectInterval) => {
    if (event.type === "event") {
      const data = event.data;
      try {
        const parsedData = JSON.parse(data) as BioApiResponse;
        const { text } = parsedData;
        setGeneratedBios((prev) => prev + text);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>DiscordInflux Bio Generator</title>
        <link rel="icon" href="https://cdn.topiclist.xyz/images/png/TopicList5.png" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20" style={{ backgroundColor: "#541dc1" }}>
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/TopicBotList/Ruby-Hoshino"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your DiscordInflux bio using chatGPT
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="https://cdn.topiclist.xyz/images/png/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Copy your current bio{" "}
              <span className="text-slate-500">
                (or write a few sentences about yourself)
              </span>
              .
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g Ranveer Soni, CEO of @TopicBotListand @RSenterprise. Verified bot developer. Passionate about development and programming. From India. RelationShip Status: Single <3."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="https://cdn.topiclist.xyz/images/png/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={setVibe} />
          </div>

          {!loading ? (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={generateBio}
            >
              Generate your bio &rarr;
            </button>
          ) : (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Generated Bios
                </h2>
                <div className="mt-6 space-y-6">
                  {generatedBios.split("\n").map((bio, index) => (
                    <p
                      className="sm:text-xl text-lg font-medium text-slate-800"
                      key={index}
                    >
                      {index + 1}. {bio}
                    </p>
                  ))}
                </div>
              </div>
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={generateBio}
              >
                Generate more bios &rarr;
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
