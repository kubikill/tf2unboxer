# Import refs and translations tool

This tool generates a list of references to match unboxertf items with items inside the tf_english.txt file in TF2's files. This is necessary for the translation function, as well as the import schema tool to function.

## Notes

This tool was built only for internal use and needs several quality of life improvements.

## Usage

1. Copy the following files from TF2's files, located in "tf/resource/", to the "vdf" folder inside this project:
  - tf_english.txt
  - tf_proto_obj_defs_english.txt
  - tf_polish.txt
  - tf_proto_obj_defs_polish.txt
  - tf_schinese.txt
  - tf_proto_obj_defs_schinese.txt
  - tf_brazilian.txt
  - tf_proto_obj_defs_brazilian.txt
  - tf_french.txt
  - tf_proto_obj_defs_french.txt
  - tf_czech.txt
  - tf_proto_obj_defs_czech.txt
  - tf_hungarian.txt
  - tf_proto_obj_defs_hungarian.txt
  - tf_romanian.txt
  - tf_proto_obj_defs_romanian.txt
  - tf_swedish.txt
  - tf_proto_obj_defs_swedish.txt
  - tf_russian.txt
  - tf_proto_obj_defs_russian.txt
2. Run the html file (for example by using the Live Preview extension in VSCode). 
3. Press "Create list" to generate ref list
4. Copy output to ref,js
5. Press "Find translations"
6. Copy output to itemnames.js, cratenames.js and unusualeffects.js