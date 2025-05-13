import {
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'

export default function HistoryPanel({
    history,
    onSelect,
    open,
    onClose,
}: {
    history: { expr: string; result: string }[]
    onSelect(h: { expr: string; result: string }): void
    onClose(): void
    open: boolean;
}) {
    return (
        <Dialog
            as="div"
            className="relative z-50"
            onClose={onClose}
            open={open}
        >
            <div
                className="fixed inset-0 bg-[var(--fg)]/40"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg bg-[var(--bg)] text-[var(--fg)] p-6 rounded-lg shadow-lg overflow-auto max-h-80">
                    <DialogTitle className="text-lg font-bold mb-4">
                        History
                    </DialogTitle>

                    {history.length === 0 ? (
                        <p className="text-sm">No history yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {history.map((h, i) => (
                                <li key={i}>
                                    <button
                                        data-testid={`history-${i}`}
                                        onClick={() => onSelect(h)}
                                        className="w-full text-left px-2 py-1 hover:bg-[var(--btn-num)] rounded key"
                                    >
                                        {h.expr} = {h.result}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-4 text-right">
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
