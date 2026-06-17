import React from 'react';
import GenericServicePage from './GenericServicePage';

export const AISolutions = () => (
    <GenericServicePage
        title="AI Solutions"
        subtitle="Empowering businesses with intelligent automation."
        description="Our AI Solutions are designed to bring predictive analytics, natural language processing, and machine learning models to your enterprise operations, enhancing decision-making and operational efficiency."
        slug="ai-solutions"
        features={[
            { title: "Machine Learning", desc: "Custom ML models for predictive insights and automation." },
            { title: "NLP & Chatbots", desc: "Advanced language processing for seamless customer interaction." },
            { title: "Computer Vision", desc: "Image and video analysis for automated quality control." },
            { title: "Data Mining", desc: "Extracting valuable patterns from massive datasets." }
        ]}
    />
);

export const CustomSoftwareDevelopment = () => (
    <GenericServicePage
        title="Custom Software Development"
        subtitle="Tailored software tailored to your specific needs."
        description="We build scalable, secure, and robust custom software applications that solve unique business challenges and integrate seamlessly into your existing workflows."
        slug="custom-software-development"
        features={[
            { title: "Enterprise Apps", desc: "Scalable software systems built for large organizations." },
            { title: "System Integration", desc: "Connecting disparate systems for unified operations." },
            { title: "Legacy Modernization", desc: "Upgrading old systems to modern tech stacks." },
            { title: "API Development", desc: "Custom APIs for secure data exchange." }
        ]}
    />
);

export const EnterpriseITSolutions = () => (
    <GenericServicePage
        title="Enterprise IT Solutions"
        subtitle="Robust IT infrastructure for modern enterprises."
        description="Comprehensive IT solutions designed to support large-scale operations, ensuring maximum uptime, security, and performance across your entire organization."
        slug="enterprise-it-solutions"
        features={[
            { title: "IT Consulting", desc: "Strategic guidance for IT infrastructure planning." },
            { title: "Network Setup", desc: "Secure and scalable enterprise networking." },
            { title: "Managed IT Services", desc: "24/7 monitoring and maintenance of IT systems." },
            { title: "Disaster Recovery", desc: "Robust backup and recovery planning." }
        ]}
    />
);

export const CloudSolutions = () => (
    <GenericServicePage
        title="Cloud Solutions"
        subtitle="Scalable and secure cloud infrastructure."
        description="We help businesses migrate to, optimize, and manage their cloud environments on AWS, Azure, and Google Cloud, ensuring high availability and cost efficiency."
        slug="cloud-solutions"
        features={[
            { title: "Cloud Migration", desc: "Seamless transition of on-premise systems to the cloud." },
            { title: "Cloud Architecture", desc: "Designing highly available and scalable cloud setups." },
            { title: "DevOps Integration", desc: "Automating deployment and infrastructure management." },
            { title: "Cloud Security", desc: "Implementing robust security measures in cloud environments." }
        ]}
    />
);

export const SCADAIndustrialAutomation = () => (
    <GenericServicePage
        title="SCADA & Industrial Automation"
        subtitle="Real-time control and monitoring for industrial systems."
        description="Our SCADA and industrial automation solutions provide real-time visibility, control, and data acquisition for manufacturing, energy, and utility sectors."
        slug="scada-industrial-automation"
        features={[
            { title: "HMI Development", desc: "Intuitive interfaces for industrial control." },
            { title: "PLC Programming", desc: "Reliable logic control for machinery." },
            { title: "Real-time Dashboards", desc: "Live monitoring of industrial processes." },
            { title: "Predictive Maintenance", desc: "Using data to foresee and prevent equipment failures." }
        ]}
    />
);

export const IoTSolutions = () => (
    <GenericServicePage
        title="IoT Solutions"
        subtitle="Connecting devices for intelligent insights."
        description="We build comprehensive Internet of Things (IoT) ecosystems, connecting hardware devices to cloud platforms for real-time telemetry, monitoring, and control."
        slug="iot-solutions"
        features={[
            { title: "Device Connectivity", desc: "Secure protocols (MQTT, CoAP) for device communication." },
            { title: "Telemetry Dashboards", desc: "Visualizing real-time sensor data." },
            { title: "Edge Computing", desc: "Processing data closer to the source for lower latency." },
            { title: "IoT Security", desc: "End-to-end encryption for connected devices." }
        ]}
    />
);

export const BusinessAutomation = () => (
    <GenericServicePage
        title="Business Automation"
        subtitle="Streamlining operations for maximum efficiency."
        description="We help organizations automate repetitive, time-consuming tasks through RPA (Robotic Process Automation) and custom scripting, reducing human error and freeing up resources."
        slug="business-automation"
        features={[
            { title: "Workflow Automation", desc: "Digitizing and automating complex business processes." },
            { title: "RPA Integration", desc: "Deploying software robots for data entry and processing." },
            { title: "Document Processing", desc: "Automated data extraction from documents." },
            { title: "CRM/ERP Automation", desc: "Streamlining data flow between core business systems." }
        ]}
    />
);

export const DataAnalytics = () => (
    <GenericServicePage
        title="Data Analytics"
        subtitle="Turning raw data into actionable intelligence."
        description="Our data analytics services help you harness the power of your data, providing deep insights, visualizations, and reporting to drive strategic decision-making."
        slug="data-analytics"
        features={[
            { title: "Data Visualization", desc: "Interactive dashboards and reports." },
            { title: "Business Intelligence", desc: "Consolidating data for enterprise-wide insights." },
            { title: "Predictive Analytics", desc: "Forecasting future trends based on historical data." },
            { title: "Data Warehousing", desc: "Centralized storage for optimized querying and analysis." }
        ]}
    />
);
