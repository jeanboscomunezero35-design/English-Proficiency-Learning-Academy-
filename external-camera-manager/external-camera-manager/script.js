const cameraSelect = document.getElementById("cameraSelect");
const teacherCamera = document.getElementById("teacherCamera");
const classCamera = document.getElementById("classCamera");
const cameraPreview = document.getElementById("cameraPreview");

let activeStream = null;

async function detectCameras() {
  const status = document.getElementById("cameraStatus");

  if (!navigator.mediaDevices?.getUserMedia) {
    status.textContent =
      "Camera access is unavailable. Open this page through GitHub Pages or another secure connection.";
    return;
  }

  try {
    const permissionStream =
      await navigator.mediaDevices.getUserMedia({ video: true });

    permissionStream.getTracks().forEach(track => track.stop());

    const devices =
      await navigator.mediaDevices.enumerateDevices();

    const cameras = devices.filter(
      device => device.kind === "videoinput"
    );

    [cameraSelect, teacherCamera, classCamera].forEach(select => {
      select.innerHTML = "";

      const firstOption = document.createElement("option");
      firstOption.value = "";
      firstOption.textContent = "Select a camera";
      select.appendChild(firstOption);

      cameras.forEach((camera, index) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.textContent =
          camera.label || `Camera ${index + 1}`;
        select.appendChild(option);
      });
    });

    status.textContent = cameras.length
      ? `${cameras.length} camera(s) detected successfully.`
      : "No cameras detected.";

  } catch (error) {
    status.textContent =
      "Camera access failed: " + error.message;
  }
}

async function startCamera() {
  const selectedId = cameraSelect.value;

  if (!selectedId) {
    document.getElementById("previewStatus").textContent =
      "Please select a camera first.";
    return;
  }

  try {
    stopCamera();

    activeStream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: selectedId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: false
      });

    cameraPreview.srcObject = activeStream;

    document.getElementById("previewStatus").textContent =
      "Camera connected. Live preview is active.";

  } catch (error) {
    document.getElementById("previewStatus").textContent =
      "Unable to start camera: " + error.message;
  }
}

function stopCamera() {
  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
    activeStream = null;
  }

  cameraPreview.srcObject = null;

  document.getElementById("previewStatus").textContent =
    "Camera stopped.";
}

document.getElementById("scanBtn")
  .addEventListener("click", detectCameras);

document.getElementById("startBtn")
  .addEventListener("click", startCamera);

document.getElementById("stopBtn")
  .addEventListener("click", stopCamera);

cameraSelect.addEventListener("change", () => {
  teacherCamera.value = cameraSelect.value;
});
