import Swal from 'sweetalert2';

/** Shared SweetAlert2 styling so every admin save/delete confirmation looks
 * consistent with the rest of the dashboard (navy brand color, rounded
 * corners) instead of each call site re-configuring its own theme. */
const baseTheme = {
  customClass: {
    popup: 'rounded-2xl',
    confirmButton: 'rounded-xl px-5 py-2.5',
    cancelButton: 'rounded-xl px-5 py-2.5',
  },
  buttonsStyling: true,
};

/** Brief, auto-dismissing success toast — used after every Save/Add. */
export function alertSuccess(title: string) {
  return Swal.fire({
    ...baseTheme,
    icon: 'success',
    title,
    toast: true,
    position: 'top-end',
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
  });
}

/** Blocking error dialog — used when a server action reports failure. */
export function alertError(title: string, text?: string) {
  return Swal.fire({
    ...baseTheme,
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#13285C',
    confirmButtonText: 'OK',
  });
}

/** Confirm-before-delete dialog. Resolves true only if the user confirms. */
export async function confirmDelete(itemLabel: string): Promise<boolean> {
  const result = await Swal.fire({
    ...baseTheme,
    icon: 'warning',
    title: `Delete ${itemLabel}?`,
    text: 'This cannot be undone.',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#8a93a6',
    focusCancel: true,
  });
  return result.isConfirmed;
}
