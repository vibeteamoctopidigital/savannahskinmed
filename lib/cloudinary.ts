/**
 * Unsigned upload via `CLOUDINARY_UPLOAD_PRESET` — no api_key/api_secret on
 * the request at all, so it isn't subject to a restricted API key's
 * per-action permissions (the signed `api_key`+`api_secret` path was
 * rejected by Cloudinary with "Request forbidden due to missing
 * permissions (actions=[create])" even though the same key could read
 * resources). The preset itself must be set to "Unsigned" in the Cloudinary
 * dashboard (Settings -> Upload -> Upload presets) for this to work.
 */
export async function uploadImage(file: Buffer, folder: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary is not configured: missing CLOUDINARY_CLOUD_NAME or CLOUDINARY_UPLOAD_PRESET.');
  }

  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(file)]), 'upload');
  form.append('upload_preset', uploadPreset);
  form.append('folder', `${process.env.CLOUDINARY_FOLDER || 'site'}/${folder}`);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `Cloudinary upload failed (${response.status})`);
  }

  return data.secure_url as string;
}
