import Markdown from "react-markdown";

type ContentLayoutProps = {
  children: React.ReactNode;
};
export const MarkdownContent = ({ children }: ContentLayoutProps) => {
  return (
    <Markdown
      className={`font-roboto text-left w-full
                            `}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-xl font-bold mb-2" {...props} />
        ),
        p: ({ node, ...props }) => <p className="my-1" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:underline" {...props} />
        ),
        img: ({ node, ...props }) => (
          <div className="my-2">
            <img
              className="w-full h-auto object-cover rounded-3xl"
              {...props}
            />
          </div>
        )
      }}
    >
      {children as string}
    </Markdown>
  );
};
