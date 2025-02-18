/obj/item/organ/internal/appendix
	name = "appendix"
	icon_state = "appendix"
	parent_organ = BP_GROIN
	organ_tag = BP_APPENDIX
	var/inflamed = 0

/obj/item/organ/internal/appendix/on_update_icon()
	..()
	if(inflamed)
		icon_state = "appendixinflamed"
		SetName("inflamed appendix")

/obj/item/organ/internal/appendix/Process()
	..()
//[SIERRA-EDIT]
	if(!owner)
		return
	owner.immunity = min(owner.immunity + 0.025, owner.immunity_norm)
	if(inflamed)
//[SIERRA-EDIT]
		inflamed++
		if(prob(5))
			if(owner.can_feel_pain())
				owner.custom_pain("You feel a stinging pain in your abdomen!")
				if(owner.can_feel_pain())
					owner.visible_message("<B>\The [owner]</B> winces slightly.")
		if(inflamed > 200)
			if(prob(3))
				take_internal_damage(0.1)
				if(owner.can_feel_pain())
					owner.visible_message("<B>\The [owner]</B> winces painfully.")
				owner.adjustToxLoss(1)
		if(inflamed > 400)
			if(prob(1))
				germ_level += rand(2,6)
				owner.vomit()
		if(inflamed > 600)
			if(prob(1))
				if(owner.can_feel_pain())
					owner.custom_pain("You feel a stinging pain in your abdomen!")
					owner.Weaken(10)

				var/obj/item/organ/external/E = owner.get_organ(parent_organ)
				E.sever_artery()
				E.germ_level = max(INFECTION_LEVEL_TWO, E.germ_level)
				owner.adjustToxLoss(25)
				removed()
				qdel(src)

//[SIERRA-ADD]
/obj/item/organ/internal/appendix/removed(mob/living/user, drop_organ=1, detach=1)
	if(owner)
		owner.immunity_norm -= 10
	..()

/obj/item/organ/internal/appendix/replaced(mob/living/carbon/human/target, obj/item/organ/external/affected)
	..()
	if(owner)
		owner.immunity_norm += 10

/obj/item/organ/internal/appendix/New(mob/living/carbon/holder)
	..()
	if(owner)
		owner.immunity_norm += 10
