import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import ReactPlayer from "react-player";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { IoVideocamOffOutline, IoVideocamOutline } from "react-icons/io5";

export default function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className={`relative ${props.count != 1 ? 'w-full' : 'xl:mx-32'} flex justify-center rounded-lg overflow-hidden`}>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn ? (
        <>
          <p className="absolute top-2 left-2 flex items-center gap-2 bg-black bg-opacity-40 rounded-lg py-1 px-3 text-white">
            {!micOn && <IoMicOffOutline className="text-red-700" />} {!webcamOn && <IoVideocamOffOutline className="text-red-700" />} {displayName}
          </p>
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={""}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </>
      ) : (<>
        <div className="min-h-full flex flex-col gap-5 items-center justify-center">
          <p className="text-white text-8xl font-semibold bg-gray-800 px-16 py-12 rounded-full">{displayName[0]}</p>
          <p className="flex items-center gap-2 bg-black bg-opacity-40 rounded-lg py-1 px-3 text-white">
            {!micOn && <IoMicOffOutline className="text-red-700" />} {!webcamOn && <IoVideocamOffOutline className="text-red-700" />} {displayName}
          </p>
        </div>
      </>)}
    </div>
  );
}