import { helpAndSupportAccordion } from "@/utils/data";
import { Accordion, Box,  AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";

export default function FAQSection() {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleAccordionChange = (panel: string) => 
        (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            width={{
                base: "100%",
                lg: "65%"
            }}
            mx="auto"
        >
            <Box
                display="flex"
                flexDirection="column"
                gap={5}
                alignItems="center"
            >
                <button
                    className="rounded-[.625rem] 
                    border border-aciu-green-normal 
                    px-[1.4rem] py-[.9rem] max-w-fit
                    text-xs text-aciu-green-normal"
                >
                    FAQs
                </button>
                <p className="font-montserrat text-2xl font-semibold text-aciu-darker-grey">
                    Got Questions? We’ve Got Answers!
                </p>
            </Box>
            {helpAndSupportAccordion.map(({ id, summary, content }) => (
                <Accordion
                    expanded={expanded === `panel${id}`} 
                    onChange={handleAccordionChange(`panel${id}`)}
                >
                    <AccordionSummary
                        expandIcon={(expanded === `panel${id}`) ? 
                            <MinusCircle size={20} color="#00B686" /> : 
                            <PlusCircle size={20} color="#00B686"/>
                        }
                        aria-controls={`panel${id}-content`}
                        id={`panel${id}-content`}
                    >
                        <Typography
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "1.125rem",
                                color: "#1D1D1D",
                                lineHeight: "1.75rem",
                            }}>
                                {summary}
                            </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "1.125rem",
                                color: "#737373",
                                lineHeight: "1.75rem",
                            }}>
                                {content}
                            </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}