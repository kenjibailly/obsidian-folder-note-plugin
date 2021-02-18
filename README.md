# Folder Note Plugin

Obsidian Plugin: Add description note to a folder. Generate card-style overview of folder. Make your vault to be a hierarchy note system.

![Folder_Note_Show](https://raw.githubusercontent.com/xpgo/obsidian-folder-note-plugin/master/image/folder-note1.png)

## Usage

- **Add** description note: CTRL+Click on a folder in the file explorer panel.
- **Show** description note: Just Click the folder.
- **Delete** description note: Just delete the opened note file.
- **Configure** : configure the note file method, file name and template on the settings panel.
- **Command**: Use some commands to control the folder note plugin.

## How it works

The mechanism is simple: attaching a note file to a folder, and the folder note file will be hidden by CSS rules. But where do you put the folder note? There are three methods of creating description note for a folder. (See the discussion at [Folder as markdown note](https://forum.obsidian.md/t/folder-as-markdown-note/2902/2) )

| Methods         | Index-File                                         | Inside-Folder                                                   | Outside-Folder                                                   |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Folder Path**      | parent/myFolder                         | parent/myFolder                                        | parent/myFolder                                        |
| **Folder Note Path** | parent/myFolder/\_about\_.md | parent/myFolder/myFolder.md                   | parent/myFolder.md                                     |
| **Configuration** | - **Note File method:** Index File<br />- **Index File Name:** \_about\_ (or other name you like) | **Note File method:** Folder Name Inside | **Note File method:** Folder Name Outside                  |
| **Pros**             | - The note file belongs to the folder. <br />- The note filename keeps the same if you rename a folder. | - The note file belongs to the folder. <br />- The note file has the same name as folder, the note title looks better. | - The note file has the same name as folder, the note title looks better.<br />- Wiki-style of linking, easy to insert link like [\[myFolder]] |
| **Cons**             | - The note filename and title may looks weird.<br />- Have to use additional file name for linking. | - Linking outside of the folder will be [\[myFolder/myFolder]].<br />- The note filename will be changed if you change the folder name. | - The note file does not belong to the folder. You have to move the note file manually if a folder is moved. <br />- The note filename will be changed if you change the folder name. |

When CTRL+Click a folder, the plugin will create a description note with the path dependent on the method you choose. When you Click a folder, the plugin will open the attached note for you. You can configure the plugin to hide/show the folder note. It can also be configured to try to automatically keep the folder and note name in syncing for methods **Inside-Folder** and **Outside-Folder** (Experimental). 

- The **default** configuration is the **Inside-Folder** method.
- If you prefer the **Outside-Folder** or **Index-File**  method, please change the settings.
- The **Index-File** method uses a note filename of  `_about_.md` (it can be configured to be `index` or others).

**NOTICE for updating from older version**

 For those who use the plugin with version < 0.4.0, please use the following steps to update:

1. Go to the Obsidian's Community Plugin page, and update the Folder Note Plugin to the latest version.
2. Disable and then Enable the Plugin to refresh plugin settings.
3. Go to the Folder Note Plugin settings page, set the **Note File Method** to a different method, and then set it back to your choice in order to let the settings take effect. 
4. Reopen Obsidian.
5. If you have any problem in updating the plugin, please leave an issue on the GitHub repo or a message on the Obsidian's forum page: [Folder Note Plugin: Add description note to folder](https://forum.obsidian.md/t/folder-note-plugin-add-description-note-to-folder/12038). 

## Configuration

- **Note File method**: select the folder note file method as mentioned above.
- **Index File Name**: For the  *Index-File*  method, set the folder note name, like `_overview_` or `index`. (Do not use {{FOLDER_NAME}} any more)
- **Note Initial Content**: set the initial content for a new folder note.
    - {{FOLDER_NAME}} in the content will be replaced with the folder name.
    - {{FOLDER_BRIEF}} in the content will be replaced with a card-style overview of current folder.
    - {{FOLDER_BRIEF_LIVE}} in the content will be replaced with a tiny code block which will be rendered to the folder overview in real time.
- **Key for New Note**: set to use CTRL+Click or ALT+Click for creating new folder note.
- **Hide Folder Note**: turn off the setting if you want to show the note file in file explorer.
- **Auto Rename**: For the methods *Inside-Folder* and *Outside-Folder*, the plugin tries to rename the folder note name when a folder name is changed or vice versa. However, this function is experimental, it does not always work. Rename them manually if you have some issue related to the operation.

## Command

Use `Ctrl+P` to open Obsidian's command panel, and use the following commands of the plugin:

- **Insert Folder Overview**: Insert a folder overview code blocks in the current note file.
- **Make Current Note to Folder**: Create a folder based on the current note and attach the note to the new folder as folder note. 

## Overview of folder

The plugin can automatically generate a code block of `ccard` in a note file for displaying overview of folder or other item data in different styles. The code block can be used and edited in any normal note file. For the syntax of `ccard` code block, please refer to [ccard Syntax](https://github.com/xpgo/obsidian-folder-note-plugin/blob/main/doc/ccard-syntax.md).

Alternatively, you can use some keywords in the initial folder note template as set in the settings page to generate the code blocks for you:

**Keyword: {{FOLDER_BRIEF}}**

The keyword {{FOLDER_BRIEF}} will be replaces with a `ccard` code block which describes an brief overview of the folder. You can edit the codes in the code block to display whatever content you like. If you want to update the overview of a folder, it can be inserted to a note by command: Ctrl+P, Insert Folder Overview.

**Keyword: {{FOLDER_BRIEF_LIVE}}**

The keyword {{FOLDER_BRIEF_LIVE}} will be replaced  with a `ccard` code block which will be rendered to the folder overview in real time. It is useful when you put some notes with image in a folder, e.g., things collections, it will generate a card view of all the notes with images dynamically.

## Change log

Remember to update the plugin, if you find some issues.

### 0.6.x

- fix yaml head for note brief (0.6.5)
- use local image path in ccard (0.6.4)
- better folder note brief (0.6.4)
- folder_brief_live use plain text of md paragraph (0.6.3)
- fix the escape of quotes (0.6.2)
- folder_brief_live uses the first paragraph note for its brief (0.6.1)
- folder_brief_live supports wiki style image (0.6.1)
- Add option for the key to create new note (0.6.0)
- Add command for creating a folder based on a note file (0.6.0)

### 0.5.x

- Fix the folder overview card for folder (0.5.2)
- Fix the hiding issue for Outside-Folder method (0.5.1)
- Add automatically rename for Inside-Folder method (0.5.1)
- Add options for three different folder note file method (0.5.0)
- Add options for auto rename (0.5.0)

## Plans for future

- Add more template option for generating the initial content.
- Automatically generate overview contents for the folder note file based on contents in the folder, like the software [Trilium](https://github.com/zadam/trilium) does. (Partially done.)
- More robust renaming operation.
- More style of overview.

## Known issues

- The folder note file may appear when created. Click it again to hide.
- Leave a message on the GitHub repo if you find any issues or want to improve the plugin.

## Install

- On the Obsidian's settings page, browse the community plugins and search 'Folder Note', then install.
- Or manually installing: go to the GitHub release page, copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/folder-note-plugin/`.
- The plugin will be updated continuously, update it through Obsidian's settings page or manually.

## Build

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Support

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="BuyMeACoffee" width="100">](https://www.buymeacoffee.com/xpgo)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/xpgo/obsidian-folder-note-plugin?style=for-the-badge)
![GitHub all releases](https://img.shields.io/github/downloads/xpgo/obsidian-folder-note-plugin/total?style=for-the-badge)
