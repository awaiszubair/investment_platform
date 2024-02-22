import React, { useId, useState } from 'react'
import config from '../../Config_array';
import { useForm } from "react-hook-form"
import SingleAnswerQuestion from '../SingleAnswerQuestion/SingleAnswerQuestion';
import MultipleAnswerQuestion from '../MultipleAnswerQuestion/MultipleAnswerQuestion';

function QuestionForm({ handleInputChange, inputValues, isactive }) {


    function renderComponents(components) {
        return components.map(Component => <div key={useId()}>
            {/* {React.cloneElement(Component, { state: 'Hello this is awais zubair' })} */}
            {Component?.type && Component?.type == "singleAnswerComponent" ?
                <SingleAnswerQuestion
                    label={Component.label}
                    heading={Component.heading}
                    question={Component.question}
                    variant={Component.variant}
                    input={Component.input}
                    handleInputChange={handleInputChange}
                    inputValues={inputValues}
                    state={"Finally The State Arrived"}
                />
                : (Component?.type && Component?.type == "multipleAnswerComponent" ?
                    <MultipleAnswerQuestion
                        heading={Component.heading}
                        question={Component.question}
                        input={Component.input}
                        handleInputChange={handleInputChange}
                        inputValues={inputValues}
                    />
                    : null)

            }
        </div>);
    }
    function renderSections(section) {
        return <section key={useId()}> {/* Generate unique key for each section */}
            <h2>{section.section}</h2>
            {section.components && section.components.length > 0 && (
                renderComponents(section.components)
            )}
            {section.sections && section.sections.length > 0 && (
                section.sections.map((nestedSection) => renderSections(nestedSection))
            )}
        </section>
    }
    return (
        <div>
            {renderSections(config[isactive])}
        </div>
    )
}

export default QuestionForm