import * as vscode from "vscode";
import { TypingBully } from "../rust/pkg/vscode_typing_bully";

let bully: TypingBully | null = null;
let whiteDecorationType: vscode.TextEditorDecorationType | null = null;
let isActive = false;

export function activate(context: vscode.ExtensionContext) {
  let startCommand = vscode.commands.registerCommand(
    "vscode-orgasm.start",
    () => {
      try {
        if (!bully) {
          bully = new TypingBully();
        }
        isActive = true;
        vscode.window.showInformationMessage("あん...はじめちゃう...♡");

        whiteDecorationType = vscode.window.createTextEditorDecorationType({
          backgroundColor: "#ffffff",
          color: "#ffffff",
          isWholeLine: true,
          textDecoration: "none",
          borderColor: "#ffffff",
          outlineColor: "#ffffff",
          overviewRulerColor: "#ffffff",
          before: {
            contentText: " ",
            backgroundColor: "#ffffff",
            color: "#ffffff",
          },
          after: {
            contentText: " ",
            backgroundColor: "#ffffff",
            color: "#ffffff",
          },
        });

        let disposable = vscode.workspace.onDidChangeTextDocument((event) => {
          if (!bully || !isActive) return;

          const result = bully.increment_and_check();
          if (result) {
            if (result === "WHITE_SCREEN") {
              const editor = vscode.window.activeTextEditor;
              if (editor && whiteDecorationType) {
                const lastLine = editor.document.lineCount - 1;
                const lastChar =
                  editor.document.lineAt(lastLine).range.end.character;

                const fullRange = new vscode.Range(0, 0, lastLine, lastChar);

                editor.setDecorations(whiteDecorationType, [
                  { range: fullRange },
                ]);
                vscode.workspace
                  .getConfiguration("editor")
                  .update("background", "#ffffff", true);
                vscode.workspace
                  .getConfiguration("editor")
                  .update("foreground", "#ffffff", true);
              }
            } else {
              vscode.window.showInformationMessage(result);
            }
          }
        });

        const statusBarItem = vscode.window.createStatusBarItem(
          vscode.StatusBarAlignment.Right,
          100
        );
        statusBarItem.text = `気持ち良さ: ${bully.get_count()}回`;
        statusBarItem.show();

        setInterval(() => {
          if (bully && isActive) {
            statusBarItem.text = `気持ち良さ: ${bully.get_count()}回`;
          }
        }, 100);

        context.subscriptions.push(disposable);
        context.subscriptions.push(statusBarItem);
      } catch (error) {
        console.error("Failed to start TypingBully:", error);
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  context.subscriptions.push(startCommand);
}

export function deactivate() {
  if (whiteDecorationType) {
    whiteDecorationType.dispose();
  }
  bully = null;
  isActive = false;
}
