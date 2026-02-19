export interface TeamMember {
  id: string; // e.g. 'max', 'jia' — for translation keys
  name: string;
  role: string;
  description: string;
  keywords: string[];
  buzzvilValue: string;
  buzzvilPrinciple: string;
  /** Optional profile link (LinkedIn, portfolio, etc.) */
  linkUrl?: string;
  linkLabel?: string;
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
    const linkUrlMatch = xmlString.match(/<linkUrl>([\s\S]*?)<\/linkUrl>/);
    const linkLabelMatch = xmlString.match(/<linkLabel>([\s\S]*?)<\/linkLabel>/);
    const linkedInMatch = xmlString.match(/<linkedIn>([\s\S]*?)<\/linkedIn>/); // legacy
    const url = linkUrlMatch?.[1]?.trim() ?? linkedInMatch?.[1]?.trim();
    const label = linkLabelMatch?.[1]?.trim() ?? (linkedInMatch ? 'LinkedIn' : undefined);
    
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
      id: '', // set by loadTeamMembers from filename
      name: nameMatch[1].trim(),
      role: titleMatch[1].trim(),
      description: descriptionMatch[1].trim(),
      keywords,
      buzzvilValue: valueMatch[1].trim(),
      buzzvilPrinciple: principleMatch[1].trim(),
      ...(url && { linkUrl: url, ...(label && { linkLabel: label }) }),
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
    'rina.xml',
    'mido.xml',
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
    <name>Max (Maxence Mauduit)</name>
  </personal>
  <buzzvil>
    <value>iterate-fast</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Experienced Product Designer and CDO</title>
    <organizationDescription>Leading the creation of playful brand interactions that scale engagement into conversion.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>0→1 Builder</keyword>
      <keyword>Systems Thinker</keyword>
      <keyword>Product Strategist</keyword>
      <keyword>Design Leader</keyword>
    </keywords>
  </expertise>
  <linkUrl>https://www.linkedin.com/in/mmaxence/</linkUrl>
  <linkLabel>LinkedIn</linkLabel>
</avatar>`;
      } else if (filename === 'jia.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Jia (Sophie Cui)</name>
  </personal>
  <buzzvil>
    <value>iterate-fast</value>
    <principle>reward-time</principle>
  </buzzvil>
  <role>
    <title>Principal Product Designer</title>
    <organizationDescription>Overseeing Buzzvil's publisher-side products. Main focus includes revenue-generation and engagement.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>unconventional methods</keyword>
      <keyword>goal-oriented</keyword>
      <keyword>trend-hunter</keyword>
    </keywords>
  </expertise>
  <linkUrl>https://www.linkedin.com/in/sophie-cui-978850b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios</linkUrl>
  <linkLabel>LinkedIn</linkLabel>
</avatar>`;
      } else if (filename === 'elle.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Elle (신성욱)</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>scalable</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Designs business-critical user experiences and leads the Ads Self-Serve domain.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Efficient Operations</keyword>
      <keyword>Simplified Complexity</keyword>
    </keywords>
  </expertise>
  <linkUrl>https://www.linkedin.com/in/seongukshin</linkUrl>
  <linkLabel>LinkedIn</linkLabel>
</avatar>`;
      } else if (filename === 'joy.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Joy (배희준)</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Designs engagement-driven ad products that connect publishers and ad agencies, creating playful experiences with monetization in mind.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>playful experience</keyword>
      <keyword>interaction design</keyword>
    </keywords>
  </expertise>
  <linkUrl>https://www.linkedin.com/in/heejunbae?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app</linkUrl>
  <linkLabel>LinkedIn</linkLabel>
</avatar>`;
      } else if (filename === 'rina.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Rina (Erin Lee)</name>
  </personal>
  <buzzvil>
    <value>clarity</value>
    <principle>scalable</principle>
  </buzzvil>
  <role>
    <title>Product Designer</title>
    <organizationDescription>Design and oversee the UI/UX for publisher-side products and the internal tool used to control, monitor, and support them.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>UI/UX</keyword>
      <keyword>Usability Improvement</keyword>
      <keyword>System Design</keyword>
      <keyword>logical thinking</keyword>
    </keywords>
  </expertise>
  <linkUrl>https://www.linkedin.com/in/elee612?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app</linkUrl>
  <linkLabel>LinkedIn</linkLabel>
</avatar>`;
      } else if (filename === 'mido.xml') {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>Mido (정초원)</name>
  </personal>
  <buzzvil>
    <value>delight</value>
    <principle>playful</principle>
  </buzzvil>
  <role>
    <title>Product Design intern</title>
    <organizationDescription>Product designer on the AD Product Team, designing the user experience for our game user-acquisition product.</organizationDescription>
  </role>
  <expertise>
    <keywords>
      <keyword>Product Design</keyword>
      <keyword>Interaction Design</keyword>
      <keyword>UX/UI</keyword>
    </keywords>
  </expertise>
</avatar>`;
      }

      const member = parseTeamMemberXML(xmlContent);
      if (member) {
        member.id = filename.replace(/\.xml$/, '');
        teamMembers.push(member);
      }
    } catch (error) {
      console.error(`Error loading team member ${filename}:`, error);
    }
  });

  return teamMembers;
}


