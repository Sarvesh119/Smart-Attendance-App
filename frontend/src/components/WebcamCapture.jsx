import Webcam from "react-webcam";
import { useRef, useState } from "react";

export default function WebcamCapture({ onCapture }) {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null);

  const capture = () => {
    const imgSrc = ref.current?.getScreenshot();
    if (!imgSrc) {
      alert("Camera not ready or permission denied");
      return;
    }
    console.log("Captured image:", imgSrc);
    setPreview(imgSrc);
    onCapture?.(imgSrc);
  };

  return (
    <div className="space-y-3">
      <Webcam
        ref={ref}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={{ facingMode: "user" }}
        className="rounded-xl border"
      />
      <button
        onClick={capture}
        className="px-4 py-2 rounded-lg bg-brand-500 text-white hover:brightness-110 transition"
      >
        Capture
      </button>

      {preview && (
        <div className="mt-3">
          <p className="text-sm text-slate-500">Preview:</p>
          <img
            src={preview}
            alt="Captured face"
            className="rounded-lg border max-w-xs"
          />
        </div>
      )}
    </div>
  );
}
