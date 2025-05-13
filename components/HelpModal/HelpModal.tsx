import {
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'

export default function HelpModal({
    open,
    onClose
}: {
    open: boolean;
    onClose(): void
}) {
    if (!open) return null
    return (
        <Dialog
            as="div"
            className="relative z-50"
            open={open}
            onClose={onClose}
        >
            <div
                className="fixed inset-0 bg-[var(--fg)]/40"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-[var(--bg)] text-[var(--fg)] p-6 rounded-lg shadow-lg">
                    <DialogTitle className="text-lg font-bold">
                        Keyboard Shortcuts
                    </DialogTitle>

                    <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
                        <li>0–9 . % ( ) + - * / → buttons</li>
                        <li>Enter → <code>=</code></li>
                        <li>Backspace / Esc → C</li>
                        <li>“Help” button or “?” key → this dialog</li>
                    </ul>

                    <div className="mt-6 text-right">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-[var(--btn-default)] rounded key"
                        >
                            Close
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
