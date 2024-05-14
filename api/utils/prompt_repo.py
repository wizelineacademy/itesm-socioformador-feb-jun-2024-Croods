rag = """Information: {context}

Question: {question}"""


def get_enterprise_category_template(tool):
    enterprise_cat_template = f"""We are talking about {tool}. Based on what it is and what it offers,the main business domain and task that most characterizes the tools purpose,  please return the category in which it best fits. You can only choose from the given Categories. Strictly return ONLY the category name.
    Categories:
    - Marketing - Content Generation: Generates personalized content for marketing campaigns, including ad copy, social media posts, and email content.
    - Marketing - Visuals Generation: Generates images and videos that align with the brand's visual identity and message.
    - Marketing - Speech Generation: Generates natural-sounding speech for voiceovers, virtual assistants, and interactive marketing materials.
    - Marketing - Customer Insights: Analyzes customer data to provide insights for targeted marketing strategies.
    - Finance - Fraud Detection: Identifies anomalies and patterns to prevent fraudulent activities in financial transactions, including credit card fraud, money laundering, and insider trading.
    - Finance - Investment Strategy: Develops investment strategies that optimize risk and return using historical data and market trends.
    - Finance - Forecasting: Identifies financial outcomes from historical data like economic indicators and industry trends.
    - People - Talent Acquisition: Identifies potential candidates based on skills, experience, and cultural fit.
    - People - Employee Engagement: Improves employee engagement by generating personalized feedback, recognition, and development plans.
    - People - Performance Management: Provides personalized insights and suggestions for enhancing employee performance from individual metrics, goals, and feedback.
    - Development - Technical Documentation: Analyzes code and algorithms to generate code comments and technical documentation.
    - Development - Code Writing: Generates and suggests code snippets.
    - Development - Testing and debugging: Tests and debugs code automatically.
    - Development - Deployment Automation: Improves the orchestration of the code release pipeline.
    - Design - Wireframing and prototyping: Generates prototypes, wireframes, and  interactive components.
    - Design - Visuals Generation: Generates variations and concepts for images, animations, and videos from art-style models.
    - Operations - Data reports: Analyzes data to generate reports and insights using data analytics.
    - Operations - Procedures Generation: Generates guidelines and procedures to ensure consistent operations.
    - Operations - Customer Support: Generates responses and solutions for customer support queries.
    - General Purpose: Provides useful functionality in a wide range of contexts, including project management, communication tools, collaboration platforms, and productivity.
    Note: Return ONLY the category name. Choose only from the options given."""
    return enterprise_cat_template


def get_gen_ai_category_template(tool):
    gen_ai_cat_template = f"""We are talking about {tool}. Based on what it is, the type of content that the Generative AI tool generates, and what it offers, please return the category that best fits. (Do not make up categories):
    Categories:
    - Text: Generates written content, including articles, creative writing, and general documentation.
    - Code: Generates code snippets, scripts, and complete programs.
    - Image: Generates images, artwork, or visual content.
    - Video: Generates videos integrating images, animations, and effects.
    - Music and Sound: Composes music and audio, imitating diverse styles and instruments.
    - Voice: Synthesizes human-like speech including voiceovers and virtual assistants.
    - 3D: Generates three-dimensional figures representing objects, characters, and environments.
    - Data: Generates and analyzes data sets.
    - Simulation: Simulates real-world scenarios, including physical systems and population dynamics for research and analysis.
    Note: Return ONLY the category name, ONLY ONE no introduction or words besides the category name. It's mandatory to choose MINIMUM ONE AND MAXIMUM ONE."""
    return gen_ai_cat_template


def ecosystem_category_template(tool):
    ecosystem_cat_template = f"""We are talking about {tool}. Based on what it is and what it offers, the AI tool's technical role in content generation, please return the category in which it best fits for Generative AI Ecosystem Layer. You can only choose from the given Categories. Strictly return ONLY the category name.
    Can accept only one of the following options:
    - Foundation Models: Tools that generate new data, content, or designs based on input data or specified parameters.
    - Cloud Services: Tools or APIs that grant access to Generative AI models.
    - Mashup Tools: Tools that connect multiple models enabling complex workflows.
    - Applications: Tools with Generative AI embedded within their features and workflows.
    - Data and Integration Services: Tools that enable applications to interact with other Generative AI tools, such as SDKs, APIs, or middleware services.
    - Infrastructure: Tools that deploy and enhance Generative AI tools, involving  infrastructure provisioning, compute hardware, and algorithms that optimize performance and manage operational costs.

    """
    return ecosystem_cat_template


def get_description_template(tool):
    description_template = (
        f""" We are talking about the tool {tool}. Please return description."""
    )
    return description_template


def get_license_template(tool):
    license_template = f"""We are talking about {tool}. Based on what it is and the available Generative AI tool free version option, please return the category in which it best fits. Strictly return the ONLY category name.
    Categories:
    - Open Source: The tool's source code is available to the public, allowing users to modify and distribute it under open-source licenses.
    - Proprietary: The tool's source code is owned by the developer or company, and its usage is subject to proprietary terms and conditions.
    - Not Found: Determines that the Generative AI tool’s reference URL doesn’t state or hint the Generative AI tool’s licensing type.
    Note: Refers to the licesing type. If it can be implemented commercially, or just for research, etc.
    """
    return license_template


def get_prompts(tool):
    """
    Returns a list of tuples containing prompt keys and their respective templates for a given tool.

    :param tool: The tool for which prompts are generated.
    :return: List of tuples (prompt_key, prompt_template)
    """
    prompts = [
        ("Primary Enterprise Category", get_enterprise_category_template(tool)),
        ("Content Type", get_gen_ai_category_template(tool)),
        ("Generative AI Ecosystem Layer", ecosystem_category_template(tool)),
        ("Tool Description", get_description_template(tool)),
        ("Licensing Type", get_license_template(tool)),
    ]
    return prompts


def get_sub_topics_prompt(givenObject):
    """
    Returns a list of tuples containing prompt keys and their respective templates for a given object.

    :param object: The object to generate sub-topic for.
    :return: promt(str)
    """
    prompts = [
        ("Top objects extractions", f"""We are talking about {givenObject}. Based on what it is, what it offers and the given information, please 
        return the top results or objects that best fits this category. Strictly return ONLY a comma separated list WITH NO numeration with the different sub-topic/object names.
        Try to extract as many objects as possible with a LIMIT of 10 results. If you can't find any, return an empty list"""),
    ]
    
    return prompts


def get_final_categories_prompt(givenObject, features):
    """
    Returns a list of tuples containing prompt keys and their respective templates for a given object.

    :param object: The object to generate sub-topic for.
    :return: promt(str)
    """
    prompts = [
        ("Top objects extractions", f"""We are talking about {givenObject}. Based on what it is, what it offers and the given information, please 
        return a disctionary with a description of the object and the following categories: {features}. If no information is found on the object on that category, retun Null on that key.
        Strictly return ONLY a dictionary with the category name as a key."""),
    ]
    
    return prompts

def get_features_prompt(givenTopic):
    """
    Returns a string containig the features to search for in the given topic, each feature should be separated by a comma.

    :param givenTopic: The topic to get the fetures for.
    :return: promt(str) 
    """

    prompts = [
        ("Features", f"""According to the topic {givenTopic}, please return the features that each object of the category should have. You will need to think like a market researcher and what features are important for the user, remember that depending on the topic one of the most important features is the price.
        The features should be separated by a comma. For example: "Price, Content Type, Devices, License Type". There should be a minimun of 3 features and a maximum of 8. The first feture MUST be "Description". """),
    ]

    return prompts
