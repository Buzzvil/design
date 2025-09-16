export interface TeamMember {
  name: string;
  role: string;
  description: string;
  keywords: string[];
  buzzvilValue: string;
  buzzvilPrinciple: string;
}

export interface TeamMemberXML {
  name: string;
  role: string;
  description: string;
  keywords: string[];
  buzzvil: {
    value: string;
    principle: string;
  };
}

/**
 * Parse XML string to extract team member data
 */
export function parseTeamMemberXML(xmlString: string): TeamMember | null {
  try {
    // Simple XML parsing - in a real app you might want to use a proper XML parser
    const nameMatch = xmlString.match(/<name>([\s\S]*?)<\/name>/);
    const roleMatch = xmlString.match(/<role>([\s\S]*?)<\/role>/);
    const descriptionMatch = xmlString.match(/<description>([\s\S]*?)<\/description>/);
    const keywordsMatch = xmlString.match(/<keywords>([\s\S]*?)<\/keywords>/);
    const valueMatch = xmlString.match(/<value>([\s\S]*?)<\/value>/);
    const principleMatch = xmlString.match(/<principle>([\s\S]*?)<\/principle>/);

    if (!nameMatch || !roleMatch || !descriptionMatch || !keywordsMatch || !valueMatch || !principleMatch) {
      console.warn('Invalid XML format for team member');
      return null;
    }

    // Parse keywords (comma-separated)
    const keywords = keywordsMatch[1]
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    return {
      name: nameMatch[1].trim(),
      role: roleMatch[1].trim(),
      description: descriptionMatch[1].trim(),
      keywords,
      buzzvilValue: valueMatch[1].trim(),
      buzzvilPrinciple: principleMatch[1].trim(),
    };
  } catch (error) {
    console.error('Error parsing team member XML:', error);
    return null;
  }
}

/**
 * Load team members from XML files
 * In a real implementation, this would load from actual files
 * For now, we'll return sample data that matches the XML format
 */
export function loadTeamMembers(): TeamMember[] {
  // Sample XML data - in production, this would load from actual XML files
  const sampleXMLData = [
    `<?xml version="1.0" encoding="UTF-8"?>
<teamMember>
  <name>Max</name>
  <role>Product Designer</role>
  <description>Leading design strategy and building world-class design teams.</description>
  <keywords>Design Strategy, Team Leadership, Product Design</keywords>
  <buzzvil>
    <value>iterate-fast</value>
    <principle>reward-time</principle>
  </buzzvil>
</teamMember>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<teamMember>
  <name>Jia</name>
  <role>Product Designer</role>
  <description>Crafting intuitive user experiences that delight and engage.</description>
  <keywords>User Research, UX Design, Prototyping</keywords>
  <buzzvil>
    <value>clarity</value>
    <principle>playful</principle>
  </buzzvil>
</teamMember>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<teamMember>
  <name>Elle</name>
  <role>Product Designer</role>
  <description>Creating beautiful, accessible interfaces that bring designs to life.</description>
  <keywords>Visual Design, Design Systems, Accessibility</keywords>
  <buzzvil>
    <value>bold</value>
    <principle>scalable</principle>
  </buzzvil>
</teamMember>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<teamMember>
  <name>Joy</name>
  <role>Product Designer</role>
  <description>Bridging design and development with code and creativity.</description>
  <keywords>Frontend Development, Design Systems, Animation</keywords>
  <buzzvil>
    <value>delight</value>
    <principle>playful</principle>
  </buzzvil>
</teamMember>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<teamMember>
  <name>Rina</name>
  <role>Product Designer</role>
  <description>Understanding users to inform better design decisions.</description>
  <keywords>User Research, Data Analysis, Usability Testing</keywords>
  <buzzvil>
    <value>grit</value>
    <principle>reward-time</principle>
  </buzzvil>
</teamMember>`,
  ];

  return sampleXMLData
    .map(xml => parseTeamMemberXML(xml))
    .filter((member): member is TeamMember => member !== null);
}

