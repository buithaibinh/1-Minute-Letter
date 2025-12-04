# MVP Scope Refinement Workflow - Instructions

<critical>The workflow execution engine is governed by: {project-root}/.bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>Communicate all responses in {communication_language} and adapt deeply to {user_skill_level}</critical>
<critical>Generate all documents in {document_output_language}</critical>
<critical>⚠️ ABSOLUTELY NO TIME ESTIMATES - NEVER mention hours, days, weeks, months, or ANY time-based predictions.</critical>
<critical>⚠️ CHECKPOINT PROTOCOL: After EVERY <template-output> tag, you MUST follow workflow.xml substep 2c: SAVE content to file immediately → SHOW checkpoint separator (━━━━━━━━━━━━━━━━━━━━━━━) → DISPLAY generated content → PRESENT options [a]Advanced Elicitation/[c]Continue/[p]Party-Mode/[y]YOLO → WAIT for user response. Never batch saves or skip checkpoints.</critical>

<workflow>

<step n="0" goal="Load and validate input documents">
<action>Load the PRD document:
- Check for {output_folder}/prd.md
- If found, load the FULL file
- If not found, check for sharded version
- If neither exists, inform user that PRD is required
</action>

<action>Load optional product brief if available:
- Check for product brief files
- Load if found
</action>

<action>Extract current MVP scope from PRD:
- Find "MVP - Minimum Viable Product" section
- Extract all MVP features listed
- Note any scope concerns or ambiguities
</action>

<check if="PRD not found">
  <output>⚠️ PRD document not found at {output_folder}/prd.md

This workflow requires a PRD to refine MVP scope. Please:
1. Run the PRD workflow first, OR
2. Provide the path to your existing PRD
</output>
  <action>Exit workflow</action>
</check>

<output>**✅ Input Documents Loaded**

Found PRD with MVP scope defined. Ready to refine and validate.
</output>
</step>

<step n="1" goal="Understand current MVP scope">
<action>Present current MVP scope from PRD:
- List all MVP features as currently defined
- Show MVP objectives/goals
- Highlight any scope boundaries mentioned
</action>

<action>Ask user about their concerns or goals:
- "What's your main goal for refining MVP scope?"
- "Are there features you're unsure about including?"
- "Is the current scope too large or too small?"
- "Are there constraints (time, resources, complexity) affecting scope?"
</action>

<template-output>current_mvp_summary</template-output>
</step>

<step n="2" goal="Challenge MVP scope - The Minimal Test">
<action>For each MVP feature, apply the Minimal Test:

**Question 1: "What breaks if we remove this?"**
- If nothing breaks → Not MVP
- If core value proposition breaks → MVP
- If user can't complete primary goal → MVP

**Question 2: "Can we launch without this?"**
- If yes, and product still works → Not MVP
- If no, product is incomplete → MVP

**Question 3: "Is this needed to prove the concept?"**
- If yes → MVP
- If no → Growth or Vision

**Question 4: "Does this support the core differentiator?"**
- If yes → MVP
- If no → Nice-to-have
</action>

<action>Go through each feature systematically:
- Present feature
- Apply Minimal Test questions
- Discuss with user
- Categorize: MVP / Growth / Vision / Out-of-scope
</action>

<template-output>minimal_test_results</template-output>
</step>

<step n="3" goal="Identify scope creep risks">
<action>Look for common scope creep patterns:

**Pattern 1: "Nice-to-have disguised as must-have"**
- Features that would be great but aren't essential
- Features that solve edge cases
- Features that optimize before validating

**Pattern 2: "Future features in MVP"**
- Features that belong in Growth or Vision
- Features that require infrastructure not yet built
- Features that add complexity without core value

**Pattern 3: "Competitive features"**
- Features added because competitors have them
- Features that don't align with core value proposition
- Features that dilute focus

**Pattern 4: "Technical perfectionism"**
- Over-engineering for scale not yet needed
- Premature optimization
- Complex solutions to simple problems
</action>

<action>Review each feature for these patterns:
- Flag potential scope creep
- Discuss with user
- Recommend moving to Growth/Vision if appropriate
</action>

<template-output>scope_creep_analysis</template-output>
</step>

<step n="4" goal="Validate MVP viability">
<action>Ensure MVP is both Minimal AND Viable:

**Minimal Check:**
- Is this the smallest set that delivers value?
- Can we remove anything else?
- Are we starting with too much?

**Viable Check:**
- Does this prove the core concept?
- Can users achieve the primary goal?
- Is this enough to validate assumptions?
- Will early adopters find this useful?
</action>

<action>Discuss viability with user:
- "What's the smallest version that proves your concept?"
- "What would make early adopters say 'good enough'?"
- "What assumptions need to be validated?"
</action>

<template-output>viability_validation</template-output>
</step>

<step n="5" goal="Define clear boundaries">
<action>Create explicit boundaries:

**MVP Boundary:**
- Clear list of what's IN MVP
- Rationale for each inclusion
- What MVP achieves (success criteria)

**Growth Boundary:**
- What comes after MVP
- Why it's deferred
- When it might be added

**Vision Boundary:**
- Long-term aspirations
- Clearly marked as "future"
- Not part of planning yet

**Out-of-Scope Boundary:**
- What we're explicitly NOT building
- Why it's excluded
- May never be built
</action>

<template-output>scope_boundaries</template-output>
</step>

<step n="6" goal="Refine MVP scope document">
<action>Create refined MVP scope document:
- Updated MVP feature list
- Clear rationale for each feature
- Success criteria for MVP
- Boundaries with Growth/Vision/Out-of-scope
</action>

<action>Update PRD if user wants:
- Option to update PRD.md with refined scope
- Or create separate mvp-scope.md document
</action>

<template-output>refined_mvp_scope</template-output>
<template-output>mvp_success_criteria</template-output>
<template-output>scope_rationale</template-output>
</step>

<step n="7" goal="Final validation and next steps">
<action>Final checklist:

**MVP Scope Quality:**
- ✅ Truly minimal (can't remove anything)
- ✅ Truly viable (proves concept)
- ✅ Clear boundaries defined
- ✅ Success criteria measurable
- ✅ No scope creep

**Readiness:**
- ✅ Ready for epic breakdown
- ✅ Ready for architecture design
- ✅ Ready for implementation planning
</action>

<output>**✅ MVP Scope Refined**

**Summary:**
- MVP features: {{mvp_feature_count}}
- Moved to Growth: {{growth_feature_count}}
- Moved to Vision: {{vision_feature_count}}
- Out-of-scope: {{out_of_scope_count}}

**Next Steps:**
1. Update PRD with refined scope (if desired)
2. Proceed to epic breakdown
3. Begin architecture design
4. Start implementation planning

**Document saved:** {default_output_file}
</output>
</step>

</workflow>

