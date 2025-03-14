document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.style.backgroundColor = '#000000';
    container.style.color = '#FFFFFF';
    container.style.fontFamily = 'Helvetica';
    container.style.margin = '0';
    container.style.padding = '20px';
    container.style.minHeight = '100vh';
    container.style.boxSizing = 'border-box';

    const contentArea = document.createElement('div');
    contentArea.style.display = 'flex';
    contentArea.style.justifyContent = 'center';
    
    const modalContainer = document.createElement('div');
    modalContainer.style.backgroundColor = '#FFFFFF';
    modalContainer.style.color = '#000000';
    modalContainer.style.width = '800px';
    modalContainer.style.borderRadius = '8px';
    modalContainer.style.padding = '20px';
    modalContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    
    const modalHeader = document.createElement('div');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.marginBottom = '20px';
    
    const editProfileText = document.createElement('div');
    editProfileText.textContent = 'Edit profile';
    editProfileText.style.fontWeight = 'bold';
    editProfileText.style.display = 'flex';
    editProfileText.style.alignItems = 'center';
    
    const editIcon = document.createElement('span');
    editIcon.textContent = '✏️';
    editIcon.style.marginRight = '8px';
    editProfileText.prepend(editIcon);
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    
    modalHeader.appendChild(editProfileText);
    modalHeader.appendChild(closeButton);
    
    // Personal details section
    const personalDetailsSection = createSection('Personal details', 'Account user info');
    
    // Profile picture and form
    const profileContent = document.createElement('div');
    profileContent.style.padding = '20px';
    
    // Profile picture
    const profilePicContainer = document.createElement('div');
    profilePicContainer.style.display = 'flex';
    profilePicContainer.style.justifyContent = 'left';
    profilePicContainer.style.marginBottom = '20px';
    
    const profilePic = document.createElement('div');
    profilePic.style.width = '100px';
    profilePic.style.height = '100px';
    profilePic.style.backgroundColor = '#29282D';
    profilePic.style.borderRadius = '50%';
    
    profilePicContainer.appendChild(profilePic);
    
    // Form fields
    const formContainer = document.createElement('div');
    
    // Name field
    const nameContainer = createFormGroup('Full name');
    const nameInput = createInput('Jane Doe');
    nameContainer.querySelector('.input-container').appendChild(nameInput);
    
    // Job title field
    const jobContainer = createFormGroup('Job title');
    const jobInput = createInput('Eg: Product Manager');
    jobContainer.querySelector('.input-container').appendChild(jobInput);
    
    const descContainer = createFormGroup('Description about me');
    const descInput = document.createElement('textarea');
    descInput.placeholder = 'Type here...';
    descInput.style.width = '100%';
    descInput.style.padding = '10px';
    descInput.style.borderRadius = '4px';
    descInput.style.border = '1px solid #D8D7DC';
    descInput.style.minHeight = '100px';
    descInput.style.boxSizing = 'border-box';
    descInput.style.fontFamily = 'Arial, sans-serif';
    descInput.style.resize = 'vertical';
    descContainer.querySelector('.input-container').appendChild(descInput);
    
    const profileLinkContainer = document.createElement('div');
    profileLinkContainer.style.margin = '15px 0';
    
    const profileLink = document.createElement('a');
    profileLink.textContent = 'See full profile page';
    profileLink.href = '#';
    profileLink.style.color = '#18171C';
    profileLink.style.display = 'flex';
    profileLink.style.alignItems = 'center';
    
    const linkIcon = document.createElement('span');
    linkIcon.textContent = '↗';
    linkIcon.style.marginLeft = '5px';
    profileLink.appendChild(linkIcon);
    
    profileLinkContainer.appendChild(profileLink);
    
    formContainer.appendChild(nameContainer);
    formContainer.appendChild(jobContainer);
    formContainer.appendChild(descContainer);
    formContainer.appendChild(profileLinkContainer);
    
    profileContent.appendChild(profilePicContainer);
    profileContent.appendChild(formContainer);
    
    personalDetailsSection.appendChild(profileContent);
    
    const reportingSection = createSection('Reporting line', 'Select a manager');
    
    const reportingContent = document.createElement('div');
    reportingContent.style.padding = '20px';
    
    const reportingContainer = createFormGroup('Reporting to');
    const reportingInput = createInput('Daniel Gao');
    reportingInput.style.width = 'calc(100% - 30px)';
    
    const clearButton = document.createElement('button');
    clearButton.textContent = '×';
    clearButton.style.background = 'none';
    clearButton.style.border = 'none';
    clearButton.style.fontSize = '16px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.marginLeft = '5px';
    
    const inputWithButton = document.createElement('div');
    inputWithButton.style.display = 'flex';
    inputWithButton.style.alignItems = 'center';
    inputWithButton.appendChild(reportingInput);
    inputWithButton.appendChild(clearButton);
    
    reportingContainer.querySelector('.input-container').appendChild(inputWithButton);
    
    const managerDisplay = document.createElement('div');
    managerDisplay.style.backgroundColor = '#F5F5F6';
    managerDisplay.style.borderRadius = '4px';
    managerDisplay.style.padding = '10px';
    managerDisplay.style.marginTop = '10px';
    
    const managerInfo = document.createElement('div');
    managerInfo.style.display = 'flex';
    managerInfo.style.alignItems = 'center';
    
    const managerInitial = document.createElement('div');
    managerInitial.textContent = 'D';
    managerInitial.style.width = '24px';
    managerInitial.style.height = '24px';
    managerInitial.style.borderRadius = '50%';
    managerInitial.style.backgroundColor = '#18171C';
    managerInitial.style.color = 'white';
    managerInitial.style.display = 'flex';
    managerInitial.style.justifyContent = 'center';
    managerInitial.style.alignItems = 'center';
    managerInitial.style.marginRight = '10px';
    managerInitial.style.fontSize = '14px';
    
    const managerName = document.createElement('div');
    managerName.textContent = 'Daniel Gao';
    
    managerInfo.appendChild(managerInitial);
    managerInfo.appendChild(managerName);
    
    managerDisplay.appendChild(managerInfo);
    
    // See org chart link
    const orgChartContainer = document.createElement('div');
    orgChartContainer.style.margin = '15px 0';
    
    const orgChartLink = document.createElement('a');
    orgChartLink.textContent = 'See Org chart';
    orgChartLink.href = '#';
    orgChartLink.style.color = '#18171C';
    orgChartLink.style.display = 'flex';
    orgChartLink.style.alignItems = 'center';
    
    const orgLinkIcon = document.createElement('span');
    orgLinkIcon.textContent = '↗';
    orgLinkIcon.style.marginLeft = '5px';
    orgChartLink.appendChild(orgLinkIcon);
    
    orgChartContainer.appendChild(orgChartLink);
    
    reportingContent.appendChild(reportingContainer);
    reportingContent.appendChild(managerDisplay);
    reportingContent.appendChild(orgChartContainer);
    
    reportingSection.appendChild(reportingContent);
    
    // Teams section
    const teamsSection = createSection('Teams', 'Manage teams');
    teamsSection.style.marginBottom = '20px';
    
    
    
    // Assemble modal components
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(personalDetailsSection);
    modalContainer.appendChild(reportingSection);
    modalContainer.appendChild(teamsSection);
    
    // Assemble page
    contentArea.appendChild(modalContainer);
    container.appendChild(contentArea);

    
    document.body.appendChild(container);
    
    // Helper function to create section
    function createSection(title, subtitle) {
        const sectionContainer = document.createElement('div');
        sectionContainer.style.borderTop = '1px solid #EEEEEE';
        sectionContainer.style.marginBottom = '10px';
        
        const sectionHeader = document.createElement('div');
        sectionHeader.style.padding = '15px 20px';
        sectionHeader.style.display = 'flex';
        sectionHeader.style.justifyContent = 'space-between';
        sectionHeader.style.alignItems = 'center';
        
        const sectionTitleContainer = document.createElement('div');
        
        const sectionTitle = document.createElement('div');
        sectionTitle.textContent = title;
        sectionTitle.style.fontWeight = 'bold';
        
        const sectionSubtitle = document.createElement('div');
        sectionSubtitle.textContent = subtitle;
        sectionSubtitle.style.color = '#888888';
        sectionSubtitle.style.fontSize = '14px';
        
        sectionTitleContainer.appendChild(sectionTitle);
        sectionTitleContainer.appendChild(sectionSubtitle);
        
        const expandIcon = document.createElement('div');
        expandIcon.textContent = '▲';
        expandIcon.style.fontSize = '12px';
        expandIcon.style.color = '#888888';
        
        sectionHeader.appendChild(sectionTitleContainer);
        sectionHeader.appendChild(expandIcon);
        
        sectionContainer.appendChild(sectionHeader);
        
        return sectionContainer;
    }
    
    // Helper function to create form group
    function createFormGroup(label) {
        const groupContainer = document.createElement('div');
        groupContainer.style.marginBottom = '20px';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.style.display = 'block';
        labelElement.style.marginBottom = '8px';
        labelElement.style.fontWeight = 'normal';
        
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
        
        groupContainer.appendChild(labelElement);
        groupContainer.appendChild(inputContainer);
        
        return groupContainer;
    }
    
    // Helper function to create input
    function createInput(placeholder) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.value = placeholder;
        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #D8D7DC';
        input.style.boxSizing = 'border-box';
        
        return input;
    }
});