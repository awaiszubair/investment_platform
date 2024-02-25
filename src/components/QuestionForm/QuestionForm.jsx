import React, { useId, useState } from 'react'
import SingleAnswerQuestion from '../SingleAnswerQuestion/SingleAnswerQuestion';
import MultipleAnswerQuestion from '../MultipleAnswerQuestion/MultipleAnswerQuestion';
import CheckBoxesComponent from '../CheckBoxesComponents/CheckBoxesComponents';
function QuestionForm({ handleInputChange, inputValues, isactive, data, setInputValues }) {


    function renderComponents(components) {
        return components.map(Component =>
            <div>
                {Component?.type && Component?.type === "singleAnswerComponent" ?
                    <SingleAnswerQuestion
                        label={Component.label}
                        heading={Component.heading}
                        question={Component.question}
                        variant={Component.variant}
                        input={Component.input}
                        handleInputChange={handleInputChange}
                        inputValues={inputValues}
                        isactive={isactive}
                        setInputValues={setInputValues}
                    />
                    : (Component?.type && Component?.type === "multipleAnswerComponent" ?
                        <MultipleAnswerQuestion
                            heading={Component.heading}
                            question={Component.question}
                            input={Component.input}
                            handleInputChange={handleInputChange}
                            inputValues={inputValues}
                            setInputValues={setInputValues}
                        />
                        : (Component?.type && Component?.type === "checkBoxesComponent" ?
                            <CheckBoxesComponent
                                heading={Component.heading}
                                question={Component.question}
                                input={Component.input}
                                handleInputChange={handleInputChange}
                                inputValues={inputValues}
                                setInputValues={setInputValues}
                            />
                            : null
                        )
                    )
                }
            </div>);
    }
    function renderSections(section) {
        return <section >
            <h2>{section.section}</h2>
            {section.components && renderComponents(section.components)}
            {section.sections && section.sections.length > 0 && (
                section.sections.map((nestedSection) => renderSections(nestedSection))
            )}
        </section>
    }
    return (
        <div>
            {isactive === data.length ? false : renderSections(data[isactive])}
        </div>
    )
}

export default QuestionForm