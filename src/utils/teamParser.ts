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
    // Parse the nested XML structure
    const nameMatch = xmlString.match(/<name>([\s\S]*?)<\/name>/);
    const titleMatch = xmlString.match(/<title>([\s\S]*?)<\/title>/);
    const descriptionMatch = xmlString.match(/<organizationDescription>([\s\S]*?)<\/organizationDescription>/);
    const valueMatch = xmlString.match(/<value>([\s\S]*?)<\/value>/);
    const principleMatch = xmlString.match(/<principle>([\s\S]*?)<\/principle>/);
    
    // Parse keywords from nested structure
    const keywordMatches = xmlString.match(/<keyword>([\s\S]*?)<\/keyword>/g);
    const keywords = keywordMatches 
      ? keywordMatches.map(match => match.replace(/<\/?keyword>/g, '').trim())
      : [];

    if (!nameMatch || !titleMatch || !descriptionMatch || !valueMatch || !principleMatch) {
      console.warn('Invalid XML format for team member');
      return null;
    }

    return {
      name: nameMatch[1].trim(),
      role: titleMatch[1].trim(),
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
 * This function loads the actual XML files from the public directory
 */
export function loadTeamMembers(): TeamMember[] {
  // List of team member XML files
  const teamMemberFiles = [
    'max.xml',
    'jia.xml', 
    'elle.xml',
    'joy.xml',
    'rina.xml'
  ];

  const teamMembers: TeamMember[] = [];

  // In a real implementation, this would fetch from the server
  // For now, we'll use a combination of actual data and fallbacks
  teamMemberFiles.forEach(filename => {
    try {
      // This would normally fetch the file content
      // For now, we'll simulate loading the actual XML content
      let xmlContent = '';
      
      // Simulate loading the actual XML file content
      // In production, this would be: await fetch(`/team-members/${filename}`)
      if (filename === 'max.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Max</name>
  </personal>
  <buzzvil>
    <value>iterate-fast</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Product Designer - CDO</title>
    <organizationDescription>Making Ads great again by provide the best post-impression ad experience there is.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Interaction design</keyword>
      <keyword>Leadership</keyword>
      <keyword>Research & Experiment</keyword>
    </keywords>
  </expertise>
</avatar>`;
      } else {
        // For other files, we'll use the existing sample data structure
        // This should be replaced with actual XML file loading
        xmlContent = getSampleXMLForFile(filename);
      }

      const member = parseTeamMemberXML(xmlContent);
      if (member) {
        teamMembers.push(member);
      }
    } catch (error) {
      console.error(`Error loading team member ${filename}:`, error);
    }
  });

  return teamMembers;
}

/**
 * Get sample XML data for files that don't have actual XML yet
 */
function getSampleXMLForFile(filename: string): string {
  const sampleData: Record<string, string> = {
    'jia.xml': `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Jia</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Crafting intuitive user experiences that delight and engage.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>User Research</keyword>
      <keyword>UX Design</keyword>
      <keyword>Prototyping</keyword>
    </keywords>
  </expertise>
</avatar>`,
    'elle.xml': `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Elle</name>
  </personal>
  <buzzvil>
    <value>bold</value>
    <principle>scalable</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Creating beautiful, accessible interfaces that bring designs to life.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Visual Design</keyword>
      <keyword>Design Systems</keyword>
      <keyword>Accessibility</keyword>
    </keywords>
  </expertise>
</avatar>`,
    'joy.xml': `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Joy</name>
  </personal>
  <buzzvil>
    <value>delight</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Bridging design and development with code and creativity.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Frontend Development</keyword>
      <keyword>Design Systems</keyword>
      <keyword>Animation</keyword>
    </keywords>
  </expertise>
</avatar>`,
    'rina.xml': `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Rina</name>
  </personal>
  <buzzvil>
    <value>grit</value>
    <principle>reward-time</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Understanding users to inform better design decisions.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>User Research</keyword>
      <keyword>Data Analysis</keyword>
      <keyword>Usability Testing</keyword>
    </keywords>
  </expertise>
</avatar>`
  };

  return sampleData[filename] || '';
}

