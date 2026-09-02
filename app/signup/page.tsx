import SignupForm from "@/app/_components/signup-form";
export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-2.5 p-4 md:-mt-32">
        <SignupForm />
      </div>
    </main>
  );
}
