# Unboxer.tf (formerly TF2 Unboxer)
A Team Fortress 2 crate/case simulator.

Available at [https://unboxer.tf](https://unboxer.tf).

## 10.26.2024
- Added Russian translation
- Added HW 2024 cases (only in .js, with pics)
- Only items added from HW 2024 (no pics, just in .js), no taunts, no warpaints

# HOWTO (ENG)

1. **Install Node.js** if you don't have it on your computer yet. Go to the [official Node.js website](https://nodejs.org/) and download the latest version.

2. **Open a command prompt or terminal** in the folder where `package.json` is located. To do this:
   - In Windows: Shift + Right-click on the folder in File Explorer and select "Open PowerShell window here" or "Open command window here".
   - In Linux or macOS: Open a terminal and navigate to the project folder using the command `cd /path/to/folder`.

3. **Install project dependencies**. Run the following command:
   ```
   npm install
   ```
   This command will install all the necessary modules described in the `package.json` file.

4. **Run the project**:

   Development:
   ```
   npm run start
   ```

   Production:
   ```
   npm run build
   ```