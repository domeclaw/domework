---
name: google-drive
description: Manage Google Drive files and folders - create folders, upload files, download files, and organize Drive content through browser automation.
command: /google-drive
verified: true
---

# Google Drive File Management Skill

## Overview

This skill provides patterns for automating Google Drive file operations through browser automation. Use it to create folders, upload files, download files, and organize Drive content.

---

## Agent Workflow (Always Follow This Order)

1. **Orient** — Navigate to Google Drive, confirm you're on the right folder.
2. **Plan** — Identify what operation to perform (create folder / upload / download / organize).
3. **Execute** — One operation at a time with verification.
4. **Verify** — Take a screenshot after each operation to confirm success.
5. **Recover if needed** — Undo (`Cmd+Z`) if something went wrong.

---

## 1. Opening Google Drive

**Navigate to Drive:**

- Go to `https://drive.google.com`
- Wait for the page to fully load (look for the file/folder list)
- Take a screenshot to confirm you're seeing the Drive interface

**Navigation within Drive:**

- Use the left sidebar to switch between "My Drive", "Shared with me", "Recent", etc.
- Click folders to navigate into subdirectories
- Use the search bar at top to find specific files/folders

**Breadcrumb navigation:**

- When inside a folder, look at the breadcrumb trail at top (e.g., "My Drive > Projects > Designs")
- Click any breadcrumb to navigate back to that level

---

## 2. Creating Folders

### Create a new folder in current location:

```
1. Click the "+ New" button (top-left)
2. Click "New folder" from the dropdown
3. Type the folder name
4. Press Enter to confirm
```

### Create a folder inside an existing folder:

```
1. Navigate to the parent folder (click it in the list or use breadcrumb)
2. Click "+ New" → "New folder"
3. Type the folder name
4. Press Enter
```

### Create nested folder structure:

```
1. Create the top-level folder first
2. Navigate into it
3. Create the subfolder
4. Repeat for each level
```

### Verify folder creation:

- Take a screenshot — the new folder should appear in the list
- Look for the folder icon and the name you just created
- If a dialog appeared, confirm it closed successfully

---

## 3. Uploading Files

### Upload via drag-and-drop (recommended):

```
1. Navigate to the target folder in Drive
2. Use the system file picker to get the local file path
3. Drag the file into the Drive browser window
4. Wait for the upload progress indicator (bottom-right) to complete
```

### Upload via "+ New" button:

```
1. Click "+ New" (top-left)
2. Click "File upload"
3. Select the file(s) from the system dialog
4. Click "Open"
5. Wait for upload to complete (check progress indicator bottom-right)
```

### Upload a folder:

```
1. Click "+ New"
2. Click "Folder upload"
3. Select the folder in the system dialog
4. Click "Upload"
5. Wait for all files to upload
```

### Verify upload:

- Check the upload progress indicator (bottom-right corner)
- Wait until it shows "Upload complete" or disappears
- Take a screenshot to confirm the file appears in the list
- Look for the file name and correct file type icon

---

## 4. Downloading Files

### Download a single file:

```
1. Navigate to the file in Drive
2. Right-click the file (or click the three dots ⋮ next to it)
3. Click "Download"
4. Wait for the browser download to start (check browser download bar)
```

### Download multiple files:

```
1. Hold Cmd and click each file to select multiple
2. Right-click any selected file
3. Click "Download"
4. Drive will zip multiple files and download as a single .zip file
```

### Download an entire folder:

```
1. Right-click the folder
2. Click "Download"
3. Drive will create a .zip file and download it
4. Wait for the zip preparation (may take time for large folders)
```

### Verify download:

- Check the browser's download bar (bottom of window) for progress
- Confirm the file appears in the Downloads folder
- For Google Docs/Sheets/Slides, they are exported as .docx/.xlsx/.pptx by default
- Take a screenshot of the download confirmation

---

## 5. Organizing Files and Folders

### Move a file/folder:

```
1. Right-click the file/folder
2. Click "Move to" or "Organize" → "Move"
3. Navigate to the target folder in the dialog
4. Click "Move here"
```

### Rename a file/folder:

```
1. Right-click the file/folder
2. Click "Rename"
3. Type the new name
4. Press Enter to confirm
```

### Delete a file/folder:

```
1. Right-click the file/folder
2. Click "Remove" (or select it and press Delete key)
3. The item moves to Trash
```

### Permanently delete from Trash:

```
1. Click "Trash" in the left sidebar
2. Right-click the item
3. Click "Delete forever"
4. Confirm the dialog
```

### Star/unstar important files:

```
1. Right-click the file/folder
2. Click "Add shortcut" or "Organize" → "Add shortcut"
3. Choose "Starred" to make it easily accessible
```

---

## 6. Searching for Files

### Basic search:

```
1. Click the search bar at top of Drive
2. Type the file/folder name
3. Press Enter
4. Review results
```

### Advanced search:

```
1. Click the search bar
2. Click the filter icon (sliders) on the right
3. Filter by:
   - Type (Folder, PDF, Google Docs, etc.)
   - Owner (Mine, Shared with me)
   - Date modified
   - Location (My Drive, Shared drives, etc.)
4. Click "Search"
```

### Search operators:

| Operator             | Example            | Purpose             |
| -------------------- | ------------------ | ------------------- |
| `type:`              | `type:folder`      | Search by file type |
| `owner:`             | `owner:me`         | Search by owner     |
| `is:`                | `is:starred`       | Filter by status    |
| `before:` / `after:` | `after:2024-01-01` | Date range          |

---

## 7. Keyboard Shortcuts

| Action          | Shortcut                     |
| --------------- | ---------------------------- |
| Select all      | `Cmd+A`                      |
| Deselect all    | `Esc`                        |
| Delete          | `Delete` or `Cmd+Delete`     |
| Rename          | `Enter` (when item selected) |
| Open            | `Enter` or double-click      |
| Download        | `Shift+D`                    |
| Add to starred  | `S`                          |
| List view       | `Cmd+Shift+1`                |
| Grid view       | `Cmd+Shift+2`                |
| Search          | `/`                          |
| Undo            | `Cmd+Z`                      |
| Redo            | `Cmd+Shift+Z`                |
| Select multiple | `Cmd+click`                  |
| Select range    | `Shift+click`                |

---

## 8. Working with Google Docs/Sheets/Slides

### Opening a Google file:

```
1. Click the Google Docs/Sheets/Slides file in Drive
2. It opens in a new browser tab
3. Wait for the editor to load fully
```

### Returning to Drive:

```
1. Close the editor tab (Cmd+W)
2. You'll be back in the Drive tab
```

### Important note:

- Google Docs/Sheets/Slides files are **not actual files** on Drive — they're shortcuts to the online editor
- When downloading, they export to .docx/.xlsx/.pptx format
- You cannot upload a .docx and have it become a Google Doc automatically

---

## 9. Sharing and Permissions (Optional)

### Share a file/folder:

```
1. Right-click the item
2. Click "Share"
3. Enter email address(es)
4. Choose permission level (Viewer, Commenter, Editor)
5. Click "Send" or "Share"
```

### Get a shareable link:

```
1. Right-click the item
2. Click "Share"
3. Under "General access", click "Restricted" → "Anyone with the link"
4. Choose permission level
5. Click "Copy link"
```

---

## 10. Error Recovery

**Something went wrong:**

1. `Cmd+Z` — Undo the last action
2. Take a screenshot to assess current state
3. Check if the file/folder is in Trash (if deleted accidentally)
4. Restore from Trash: right-click → "Restore"

**Common problems and fixes:**

| Problem                  | Fix                                                        |
| ------------------------ | ---------------------------------------------------------- |
| Upload stuck             | Cancel upload, retry, check internet connection            |
| File name already exists | Drive adds "(1)" to duplicate names — rename if needed     |
| Folder won't open        | Refresh page (Cmd+R), try again                            |
| Wrong tab                | Check browser tabs — Drive may have opened file in new tab |
| Permission denied        | Check sharing settings, ensure you have access             |

---

## 11. Browser Automation Tips

- **Always take screenshots** before and after operations to verify state
- **Wait for page loads** — Drive is a single-page app, look for the loading spinner to disappear
- **Use right-click context menus** — most actions are available via right-click
- **Check upload/download progress** — look for indicators in bottom-right corner
- **Drive view modes**: Use list view (more detailed) or grid view (visual thumbnails) depending on the task
- **Breadcrumb navigation**: Always check breadcrumbs to confirm current folder location

---

## 12. Common Workflows

### Workflow: Create a project folder structure

```
1. Navigate to My Drive
2. Create folder: "Project Alpha"
3. Navigate into "Project Alpha"
4. Create subfolders: "Documents", "Images", "Reports"
5. Take a screenshot to confirm structure
```

### Workflow: Upload files to a folder

```
1. Navigate to the target folder
2. Click "+ New" → "File upload"
3. Select files from system dialog
4. Wait for upload progress to complete
5. Take a screenshot to confirm files appear
```

### Workflow: Download and organize files

```
1. Search for or navigate to the files
2. Select files (Cmd+click for multiple)
3. Right-click → "Download"
4. Wait for zip download
5. Verify in system Downloads folder
```

---

## 13. Saving

Google Drive **auto-saves continuously**. All changes (creates, moves, renames, deletes) are saved immediately to the cloud. You do not need to manually save.

- Look for "All changes saved in Drive" at top to confirm sync status
- If you see "Saving..." wait before performing another action
