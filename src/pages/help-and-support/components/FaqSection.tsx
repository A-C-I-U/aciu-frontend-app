import { helpAndSupportAccordion } from "@/utils/data";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";

export default function FAQSection() {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleAccordionChange = (panel: string) => 
        (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
       <div className="flex flex-col gap-12 w-full lg:w-[65%] mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-5 items-center">
                <button
                    className="
                        rounded-[.625rem] border border-aciu-green-normal px-5.5 py-3.5
                        max-w-fit text-xs text-aciu-green-normal"
                >
                    FAQs
                </button>
                <p className="text-center text-xl md:text-2xl font-semibold text-aciu-darker-grey">
                    Got Questions? We’ve Got Answers!
                </p>
            </div>

            {/* Accordions */}
            <div className="flex flex-col gap-6">
                {helpAndSupportAccordion.map(({ id, summary, content }) => (
                    <Accordion
                        key={id}
                        expanded={expanded === `panel${id}`}
                        onChange={handleAccordionChange(`panel${id}`)}
                        sx={{
                            boxShadow: "none",
                            padding: "1.5rem 0 0 0",
                            "&.Mui-expanded": { padding: 0 },
                            "&:first-of-type": { borderTop: "none", paddingTop: 0 },
                            "&:last-of-type": { paddingBottom: 0, marginBottom: 0 },
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                expanded === `panel${id}` ? (
                                <MinusCircle size={20} color="#00B686" />
                                ) : (
                                <PlusCircle size={20} color="#00B686" />
                                )
                            }
                            aria-controls={`panel${id}-content`}
                            id={`panel${id}-content`}
                        >
                            <p className="text-aciu-darker-grey md:text-lg leading-7">
                                {summary}
                            </p>
                        </AccordionSummary>

                        <AccordionDetails sx={{ padding: "0 1rem" }}>
                            <p className="text-aciu-abriba text-sm md:text-base leading-7">
                                {content}
                            </p>
                        </AccordionDetails>
                    </Accordion>
                    ))}
            </div>
        </div>
    )
}