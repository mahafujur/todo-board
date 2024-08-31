import React, {useCallback, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button} from "@/components/Atom";

interface DescriptionEditorProps {
    initialValue?: string;
    value?: string;
    onSave?: (content: string) => void;
    onChange?: (content: string) => void;
    viewOnly?: boolean;
    onCancel?: () => void;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({

                                                                 initialValue = '',
                                                                 onSave,
                                                                 onChange,
                                                                 viewOnly = false,
                                                                 onCancel,
                                                                 value = ''
                                                             }) => {
    const [content, setContent] = useState(value);

    const handleChange = useCallback(
        (value: string) => {
            setContent(value);
            if (onChange) onChange(value);
        },
        [onChange]
    );

    const handleCancel = () => {
        setContent(initialValue);
        if(onCancel)onCancel()
    }

    const handleSave = useCallback(() => {
        if (onSave) onSave(content);
    }, [content, onSave]);

    const modules = viewOnly
        ? {toolbar: false} // Disable toolbar in view-only mode
        : {
            toolbar: [
                [{header: '1'}, {header: '2'}, {font: []}],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{list: 'ordered'}, {list: 'bullet'}],
                ['link', 'image'],
                ['clean'],
            ],
        };

    return (
        <div className="flex flex-col gap-4">
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                readOnly={viewOnly} // Make the editor read-only if viewOnly is true
                className="h-[160px]"
            />
            {!viewOnly && ( // Conditionally render the Save button if not in view-only mode
                <div className={'mt-16 self-start flex gap-x-1'}>
                    <Button variant={'blue'} size={'medium'} type={'primary'}
                            className="  px-4 py-2 transition duration-200"
                            onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button variant={'pink'} size={'medium'} type={'text'}
                            className="px-4 py-2 transition duration-200"
                            onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DescriptionEditor;
