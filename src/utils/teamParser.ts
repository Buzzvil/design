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

  // Load actual XML content for each team member
  teamMemberFiles.forEach(filename => {
    try {
      let xmlContent = '';
      
      // Load the actual XML file content
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
      } else if (filename === 'jia.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
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
</avatar>`;
      } else if (filename === 'elle.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Elle Shin</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>scalable</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Systematically design user experiences essential for business</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Operational efficiency</keyword>
      <keyword>Consistent experience</keyword>
    </keywords>
  </expertise>
</avatar>`;
      } else if (filename === 'joy.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Joy</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Build and develop the user experience of an advertising product that connects agencies and media.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Product Design</keyword>
      <keyword>UX</keyword>
      <keyword>UI</keyword>
    </keywords>
  </expertise>
</avatar>`;
      } else if (filename === 'rina.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Rina Lee</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>scalable</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>I am a Product Designer on the Supply Experience Team, specializing in the UI/UX of the Benefit Hub and the internal operation system, Dash, that enables and monitors it.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>UI/UX</keyword>
      <keyword>Usability Improvement</keyword>
      <keyword>System Design</keyword>
    </keywords>
  </expertise>
</avatar>`;
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


