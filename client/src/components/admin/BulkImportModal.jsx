import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

/**
 * Modal import hàng loạt từ vựng (CSV/JSON)
 */
export default function BulkImportModal({ isOpen, onClose, onImport }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImport = async () => {
        if (!file) return;
        setLoading(true);
        try {
            await onImport(file);
            onClose();
        } catch (error) {
            console.error('Import failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="📥 Bulk Import Vocabulary">
            <div className="space-y-4">
                <p className="text-sm text-gray-500">
                    Upload a CSV or JSON file containing vocabulary data.
                    Required fields: word, reading, meaning, jlptLevel
                </p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                    <input
                        type="file"
                        accept=".csv,.json"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="bulk-import-file"
                    />
                    <label htmlFor="bulk-import-file" className="cursor-pointer">
                        {file ? (
                            <span className="text-sm text-[#8B5CF6] font-medium">{file.name}</span>
                        ) : (
                            <span className="text-sm text-gray-400">Click to select file or drag & drop</span>
                        )}
                    </label>
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleImport} loading={loading} disabled={!file}>
                        Import
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
