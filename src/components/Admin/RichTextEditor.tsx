"use client";

import { useEffect, useRef, useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

type FormatCommand =
  | "bold" | "italic" | "underline" | "strikeThrough"
  | "insertUnorderedList" | "insertOrderedList"
  | "justifyLeft" | "justifyCenter" | "justifyRight"
  | "formatBlock";

const TOOLBAR: {
  label: string;
  title: string;
  cmd: FormatCommand;
  value?: string;
}[][] = [
  [
    { label: "B",  title: "Bold",          cmd: "bold" },
    { label: "I",  title: "Italic",        cmd: "italic" },
    { label: "U",  title: "Underline",     cmd: "underline" },
    { label: "S",  title: "Strikethrough", cmd: "strikeThrough" },
  ],
  [
    { label: "H1", title: "Heading 1", cmd: "formatBlock", value: "h2" },
    { label: "H2", title: "Heading 2", cmd: "formatBlock", value: "h3" },
    { label: "H3", title: "Heading 3", cmd: "formatBlock", value: "h4" },
    { label: "P",  title: "Paragraph", cmd: "formatBlock", value: "p" },
  ],
  [
    { label: "UL", title: "Bullet list",   cmd: "insertUnorderedList" },
    { label: "OL", title: "Numbered list", cmd: "insertOrderedList" },
  ],
  [
    { label: "←", title: "Align left",   cmd: "justifyLeft" },
    { label: "↔", title: "Align center", cmd: "justifyCenter" },
    { label: "→", title: "Align right",  cmd: "justifyRight" },
  ],
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your post content here…",
  minHeight = 400,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  // Track whether the editor content was set from outside to avoid cursor jump
  const lastValueRef = useRef<string>("");

  // Sync external value → editor only when it changes from outside
  useEffect(() => {
    if (!editorRef.current) return;
    if (value !== lastValueRef.current) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, [value]);

  const exec = useCallback((cmd: FormatCommand, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    // Sync after command
    const html = editorRef.current?.innerHTML ?? "";
    lastValueRef.current = html;
    onChange(html);
  }, [onChange]);

  const handleInput = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? "";
    lastValueRef.current = html;
    onChange(html);
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // Strip formatting from pasted text — paste as plain text only
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const isEmpty = !value || value === "<br>" || value === "<div><br></div>";

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden focus-within:border-primary transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#161b27]">
        {TOOLBAR.map((group, gi) => (
          <div key={gi} className="flex gap-0.5 border-r border-gray-200 dark:border-gray-700 pr-1 last:border-0 last:pr-0">
            {group.map((btn) => (
              <button
                key={btn.label}
                type="button"
                title={btn.title}
                onMouseDown={(e) => {
                  e.preventDefault(); // keep focus in editor
                  exec(btn.cmd, btn.value);
                }}
                className={`
                  px-2 py-1 text-xs font-medium rounded transition-colors
                  text-gray-600 dark:text-gray-400
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  hover:text-gray-900 dark:hover:text-white
                  ${btn.label === "B" ? "font-bold" : ""}
                  ${btn.label === "I" ? "italic" : ""}
                  ${btn.label === "U" ? "underline" : ""}
                `}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Editable area */}
      <div className="relative">
        {isEmpty && (
          <p className="absolute top-3 left-4 text-sm text-gray-400 pointer-events-none select-none">
            {placeholder}
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          style={{ minHeight }}
          className="
            p-4 text-sm text-gray-900 dark:text-white
            focus:outline-none
            prose prose-sm dark:prose-invert max-w-none
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1
            [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mt-2 [&_h4]:mb-1
            [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
            [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic
            bg-white dark:bg-[#1e2436]
          "
        />
      </div>

      {/* Character hint */}
      <div className="px-4 py-1.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#161b27]">
        <p className="text-xs text-gray-400">
          HTML output · Use toolbar to format · Paste strips formatting
        </p>
      </div>
    </div>
  );
}