# Team Members XML Files

This folder contains XML files for each team member. To add a new team member:

## 1. Create a new XML file

Create a new file named `[name].xml` (e.g., `john.xml`) with the following structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<teamMember>
  <name>John Doe</name>
  <role>Product Designer</role>
  <description>Brief description of what this person does.</description>
  <keywords>Skill 1, Skill 2, Skill 3</keywords>
  <buzzvil>
    <value>iterate-fast</value>
    <principle>reward-time</principle>
  </buzzvil>
</teamMember>
```

## 2. Available Buzzvil Values

Choose one of these values for the `<value>` tag:
- `iterate-fast` - Orange/gold colors, centered positioning
- `clarity` - Light blue/white colors, centered positioning  
- `grit` - Dark red colors, offset positioning
- `bold` - Magenta/pink colors, wide spread positioning
- `one-team` - Blue colors, vertical alignment
- `delight` - Pink/turquoise colors, diagonal spread

## 3. Available Buzzvil Principles

Choose one of these principles for the `<principle>` tag:
- `reward-time` - Scale-focused breathing/pulsing animation
- `playful` - Rotation-focused spinning/tumbling animation
- `scalable` - Position-focused growth/expansion animation

## 4. Update the teamParser.ts

After adding XML files, update the `loadTeamMembers()` function in `src/utils/teamParser.ts` to include your new XML data.

## Example XML Files

See the existing files in this folder for examples:
- `max.xml` - iterate-fast + reward-time
- `jia.xml` - clarity + playful  
- `elle.xml` - bold + scalable
- `joy.xml` - delight + playful
- `rina.xml` - grit + reward-time

## Avatar Generation

Team members can also generate their own avatars using the `/my-avatar` page, which will create XML files in this same format that can be saved here.

