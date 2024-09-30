import Link from "next/link";

export function Footer() {
  return (
    <div className=" w-full shadow-none border-none bg-gradient-to-br from-slate-100 via-blue-100 to-blue-100 bg-bottom bg-no-repeat bg-cover lg:rounded-b-3xl">
      <div className="mx-4 md:mx-8 flex lg:h-20 h-28 items-center ">
        {/* <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Built on top of{""}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/salimi-my/shadcn-ui-sidebar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p> */}
      </div>
    </div>
  );
}
