"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { redirect } from "next/navigation"
import AnimatedText from "../components/AnimatedText"

export default function Signup() {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")

  if (session) {
    redirect("/dashboard")
  }

  const handleSignInGithub = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: "/dashboard",
      redirect: false,
      windowFeatures: "width=800,height=600",
    })

    if (result?.url) {
      window.open(result.url, "GitHubLogin", "width=800,height=600")
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error)
    }
  }

  const handleSignInGoogle = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: "/dashboard",
      redirect: false,
      windowFeatures: "width=800,height=600",
    })

    if (result?.url) {
      window.open(result.url, "GoogleLogin", "width=800,height=600")
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error)
    }
  }

  const handleSignInSlack = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: "/dashboard",
      redirect: false,
      windowFeatures: "width=800,height=600",
    })

    if (result?.url) {
      window.open(result.url, "SlackLogin", "width=800,height=600")
    }

    if (result?.error) {
      console.error("Authentication failed:", result.error)
    }
  }

  const handleSignInEmail = async () => {
    console.log("Email: ", email)
    await signIn("email", { email, redirect: false, callbackUrl: "/dashboard" })
      .then((result) => {
        console.log("Result: ", result)
        if (result?.url) {
          router.push(result.url)
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error.message)
      })
  }

  return (
    <main className="bg-backgroundLight dark:bg-backgroundDark">
      <div className="mx-auto flex h-screen max-w-6xl flex-wrap content-center justify-center px-6 text-gray-600">
        <section className="absolute top-10 mb-10 flex w-full justify-center">
          <Image
            className="dark:invert"
            src={"/Logo.svg"}
            alt="Next.js Logo"
            width={60}
            height={60}
            priority
          />
        </section>
        <div className=" flex flex-col items-center">
          <div className="py-10 text-4xl">
            <AnimatedText text="KnowX" />
          </div>

          <div className="space-y-15 flex flex-col items-center justify-center rounded-[25px] bg-white p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex h-12 w-64 items-center justify-center rounded-lg bg-backgroundLight px-4 text-black shadow-md"
              />
              <button
                onClick={() => handleSignInEmail()}
                className="w-30 text-md mb-10 flex h-8 items-center justify-center rounded-lg border-2 border-[#0000001a] px-8 text-black shadow transition ease-in-out hover:bg-backgroundLight"
              >
                Sign in with Email
              </button>
            </div>
            <hr className="mt-10 w-64 overflow-visible border-black text-center before:relative before:-top-3.5 before:bg-white before:px-2 before:text-black before:content-['or']"></hr>
            <div className="mt-10 flex flex-col items-center justify-center space-y-4">
              <button
                className="flex h-12 w-64 items-center justify-center rounded-lg border-2 border-[#0000001a] bg-[#24292f] px-4 py-3 text-lg text-white transition ease-in-out hover:bg-[#24292fcc]"
                onClick={() => handleSignInGithub("github")}
              >
                <Image
                  loading="lazy"
                  height="24"
                  width="24"
                  id="provider-logo-dark"
                  src="https://authjs.dev/img/providers/github.svg"
                  alt="Github Logo"
                ></Image>
                <span className="grow">Sign in with GitHub</span>
              </button>
              <button
                className="flex h-12 w-64 items-center justify-center rounded-lg border-2 border-[#0000001a] bg-white px-4 py-3 text-lg text-black transition ease-in-out hover:bg-[#ffffffcc]"
                onClick={() => handleSignInGoogle("google")}
              >
                <Image
                  loading="lazy"
                  height="24"
                  width="24"
                  id="provider-logo-dark"
                  src="https://authjs.dev/img/providers/google.svg"
                  alt="Google Logo"
                ></Image>
                <span className="grow">Sign in with Google</span>
              </button>
              <button
                className="flex h-12 w-64 items-center justify-center rounded-lg border-2 border-[#0000001a] bg-black px-4 py-3 text-lg text-white transition ease-in-out hover:bg-[#000000cc]"
                onClick={() => handleSignInSlack("slack")}
              >
                <Image
                  loading="lazy"
                  height="24"
                  width="24"
                  id="provider-logo-dark"
                  src="https://authjs.dev/img/providers/slack.svg"
                  alt="Slack Logo"
                ></Image>
                <span className="grow">Sign in with Slack</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
