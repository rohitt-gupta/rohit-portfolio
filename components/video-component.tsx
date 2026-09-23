export default function VideoComponent({ videoUrl }: { videoUrl: string }) {
  return (
    <div
      className="mx-auto max-w-4xl"
      style={{
        overflow: "hidden",
        paddingBottom: "56.25%",
        position: "relative",
        height: "0",
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        width="520"
        height="325"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
